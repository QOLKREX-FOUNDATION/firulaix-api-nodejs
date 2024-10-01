const Sequence = require("../model/Sequence");

const generateSequence = async (modelName, fieldName) => {
  const sequenceDoc = await Sequence.findOneAndUpdate(
    { model: modelName, field: fieldName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return sequenceDoc.value;
};

module.exports = {
  generateSequence,
};
