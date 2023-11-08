const { Schema, model } = require("mongoose");

const SchemaDocuments = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true
    },
    minDigits: {
      type: String,
      required: true,
    },
    maxDigits: {
      type: String,
      required: true,
    },
    countries: [
      {
        ref: "CodePhone",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

SchemaDocuments.method("toJSON", function () {
  const { __v, _id, ...document } = this.toObject();
  document.id = _id;
  return document;
});

module.exports = model("DocumentIdentity", SchemaDocuments);
