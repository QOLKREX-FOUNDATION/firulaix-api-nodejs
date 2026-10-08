const { Schema, model } = require("mongoose");

const accountDonatorSchema = new Schema(
  {
    amountsoles: {
      type: Number,
      required: true,
      default: 0,
    },
    campaign: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "accountdonators", timestamps: true },
);

module.exports = model("AccountDonator", accountDonatorSchema);
