const { Schema, model } = require("mongoose");

const SchemaCodePhone = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    phoneCode: {
      type: String,
      required: true,
    },
    image: {
      cloduinaryId: {
        type: String,
        default: "",
      },
      imageUrl: {
        type: String,
        default: "",
      },
    },
    nationality: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

SchemaCodePhone.method("toJSON", function () {
  const { __v, _id, ...codePhone } = this.toObject();
  codePhone.id = _id;
  return codePhone;
});

module.exports = model("CodePhone", SchemaCodePhone);
