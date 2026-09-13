const Sequence = require("../model/Sequence");

const generateSequence = async (modelName, fieldName, increment = 1) => {
  const sequenceDoc = await Sequence.findOneAndUpdate(
    { model: modelName, field: fieldName },
    { $inc: { value: increment } },
    { new: true, upsert: true },
  );

  return sequenceDoc.value;
};

module.exports = {
  generateSequence,
};
