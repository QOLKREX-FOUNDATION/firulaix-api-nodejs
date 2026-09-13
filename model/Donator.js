const { Schema, model } = require("mongoose");

const SchemaDonator = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paws: {
      type: Number,
      required: true,
    },
    soles: {
      type: Number,
      required: true,
    },
    campaign: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

SchemaDonator.method("toJSON", function () {
  const { __v, _id, ...document } = this.toObject();
  document.id = _id;
  return document;
});

module.exports = model("Donator", SchemaDonator);
