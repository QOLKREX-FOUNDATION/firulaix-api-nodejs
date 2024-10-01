const { Schema, model } = require("mongoose");

const SchemaAnimals = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true
    },
    nameSpanish: {
      type: String,
      required: true,
      // unique: true
    },
    nameEnglish: {
      type: String,
      required: true,
      // unique: true
    },
  },
  { timestamps: true }
);

SchemaAnimals.method("toJSON", function () {
  const { __v, _id, ...animal } = this.toObject();
  animal.id = _id;
  return animal;
});

module.exports = model("Animal", SchemaAnimals);
