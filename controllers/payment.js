const mercadopago = require("mercadopago");

const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
    });

    // const { price, title, unit } = req.body;

    const preference = {

        items: [
            {
                title: "Registro Completo",
                unit_price: 60,
                quantity: 1,
                currency_id: "PEN",
                // unit_price: price,
                // quantity: unit,
            },
        ],
        back_urls: {
            success: `${ process.env.HOST }/es/request`,
            // failure: `${ process.env.HOST }/failure`,
        },
        notification_url: "https://11be-190-237-31-118.ngrok-free.app/api/payment/webhook"
    };

    try {

        const response = await mercadopago.preferences.create(preference);
        // console.log("response", response.body)
        res.status(200).json({ data: response.body });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};

const createOrder2 = async (req, res) => {
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
    });

    // const { price, title, unit } = req.body;

    const preference = {

        items: [
            {
                title: "Solo Registro",
                unit_price: 25,
                quantity: 1,
                currency_id: "PEN",
                // unit_price: price,
                // quantity: unit,
            },
        ],
        back_urls: {
            success: `${ process.env.HOST }/es/request`,
            // failure: `${ process.env.HOST }/failure`,
        },
        notification_url: "https://11be-190-237-31-118.ngrok-free.app/api/payment/webhook"
    };

    try {

        const response = await mercadopago.preferences.create(preference);
        // console.log("response", response.body)
        res.status(200).json({ data: response.body });
    }
    catch (error) {
        console.log("error", error)
        res.status(500).json({ error });
    }
};

const reciveWebhook = async (req, res) => {
    // console.log("webhook", req.query);

    const payment = req.query;
    console.log("payment", payment)

    try {
        if (payment.type === "payment") {
            const paymentInfo = await mercadopago.payment.findById(payment["data.id"]);
            console.log("paymentInfo", paymentInfo);

            if (paymentInfo.status === "approved") {
                // store in DB
                // email de confirmacion de pago
            }
        }
        return res.status(200).json({ data: "ok" });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error });
    }
};

module.exports = {
    createOrder,
    createOrder2,
    reciveWebhook
}