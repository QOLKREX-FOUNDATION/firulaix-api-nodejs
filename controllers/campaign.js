const Donator = require("../model/Donator");
const AccountDonator = require("../model/AccountDonator");

const baseUrl = "https://firulaix-api-nodejs.vercel.app";

const getAllDonators = async (req, res) => {
  try {
    const donators = await Donator.find();
    res.json(donators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonatorsByCampaign = async (req, res) => {
  try {
    const { campaign } = req.params;
    console.log({ campaign });
    const donators = await Donator.find({ campaign }).exec();
    res.json(donators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalAmountByCampaign = async (req, res) => {
  try {
    const { campaign } = req.params;
    const accountDonator = await AccountDonator.findOne({
      campaign: String(campaign),
    }).lean();
    const amountsoles = accountDonator?.amountsoles || 0;

    res.json({
      totalAmount: amountsoles,
      amountsoles,
      amountpaws: accountDonator?.amountpaws || 0,
      amountsuma: accountDonator?.amountsuma || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDonators,
  getDonatorsByCampaign,
  getTotalAmountByCampaign,
};
