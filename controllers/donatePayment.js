const mercadopago = require("mercadopago");
const { mailGreetingDonation } = require("../helpers/mail");

// const URL = "https://7760-190-237-1-65.ngrok.io";
const URL = "https://firulaix-api-nodejs.vercel.app";

let donationInfo = {};
let redirectDonationUrl = "https://worldanimalregistry.org/es/donate";

const createOrder = async (req, res) => {
  const { amount, currency, name, lastName, email, dni, donationUrl } =
    req.body;
  redirectDonationUrl = donationUrl;
  if (amount < 5) {
    return res.status(400).json({
      msg: "La donacion tiene que ser mayor o igual a 5 dolares",
    });
  }
  if (!amount || !currency) {
    return res.status(400).json({
      msg: "Amount and currency are required",
    });
  }
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  });

  donationInfo = { name, lastName, email, dni, amount, currency };

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Donación",
          unit_price: Number(amount),
          currency_id: currency.toUpperCase(),
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${URL}/api/donate-payment/success`,
        // pending: `${URL}/api/donate-payment/pending`,
        failure: `${URL}/api/donate-payment/failure`,
      },
      auto_return: "approved",
      notification_url: `${URL}/api/donate-payment/webhook`,
    });
    res.send(result.body);
  } catch (error) {
    console.log(error);
  }
};

const receiveWebhook = async (req, res) => {
  const payment = req.query;
  // console.log(req.query);
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(req.query["data.id"]);
      if (data.body.status === "approved") {
        if (donationInfo && donationInfo.email) {
          // console.log({ donationInfo });
          await mailGreetingDonation({
            amount: donationInfo.amount,
            currency: donationInfo.currency,
            name: donationInfo.name,
            lastName: donationInfo.lastName,
            email: donationInfo.email,
            dni: donationInfo.dni,
          });
        }
        return res.status(200).json({
          msg: "approved",
        });
      }
      if (data.body.status === "pending") {
        return res.status(200).json({
          msg: "pending",
        });
      }
      if (data.body.status === "rejected") {
        return res.status(400).json({
          msg: "rejected",
        });
      }
    }
    res.status(204).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const successDonation = (req, res) => {
  res.redirect(`${redirectDonationUrl}?message=success`);
};

const rejectDonation = (req, res) => {
  res.redirect(`${redirectDonationUrl}?message=reject`);
};

module.exports = {
  createOrder,
  receiveWebhook,
  successDonation,
  rejectDonation,
};
