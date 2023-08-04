const { Schema, model } = require("mongoose");

const SchemaColors = new Schema(
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
    hex: {
      type: String,
      required: true,
      // unique: true
    },
  },
  { timestamps: true }
);

SchemaColors.method("toJSON", function () {
  const { __v, _id, ...colors } = this.toObject();
  colors.id = _id;
  return colors;
});

module.exports = model("Color", SchemaColors);
