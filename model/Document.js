const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema({
    name: {
		type: String,
		required: true,
	},
});

module.exports = model("Document", DocumentSchema);
