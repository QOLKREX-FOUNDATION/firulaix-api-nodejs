const { Schema, model } = require("mongoose");

const CountrySchema = new Schema({
    alpha3: {
		type: String,
		required: true,
	},
    name: {
		type: String,
		required: true,
	},
    natural: {
        type: String,
		required: true,
	},
    legal: {
        type: String,
		required: true,
	},
    foreign: {
        type: String,
		required: true,
	},
    passport: {
        type: String,
		required: true,
	},
});

module.exports = model("Country", CountrySchema);
