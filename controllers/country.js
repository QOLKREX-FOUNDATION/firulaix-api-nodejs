const { response } = require("express");
const Country = require("../model/Country");
const Document = require("../model/Document");

const getRecord = async (req, res = response) => {
	try {
		const countries = await Country.find();
        const documents = await  Document.find({name:{"$ne":"PASSPORT"}});

        const passport = await  Document.findOne({name:"PASSPORT"});
        documents.push(passport);
		res.json({
			ok: true,
			countries,
            documents
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error, contact Admin",
		});
	}
};

module.exports = {
	getRecord,
};
