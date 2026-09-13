const { Schema, model } = require("mongoose");

const sequenceSchema = new Schema(
  {
    model: String,
    field: String,
    value: Number,
    pawstotal: Number,
    amounttotal: Number,
  },
  { collection: "sequences" },
);

sequenceSchema.method("toJSON", function () {
  const { __v, _id, ...sequence } = this.toObject();
  sequence.id = _id;
  return sequence;
});

module.exports = model("Sequence", sequenceSchema);
