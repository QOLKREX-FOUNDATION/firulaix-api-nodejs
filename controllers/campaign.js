const Donator = require("../model/Donator");

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
    const donators = await Donator.find({ campaign }).exec();
    const totalAmount = donators.reduce(
      (acc, donator) => acc + donator.amount,
      0
    );
    res.json({ totalAmount: totalAmount / 10 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDonators,
  getDonatorsByCampaign,
  getTotalAmountByCampaign,
};
