const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No token",
		});
	}

	try {
		const { uid, name, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);
		if (!uid) {
			return res.status(401).json({
				ok: false,
				msg: "No uid token",
			});
		}
		req.uid = uid;
		req.name = name;
		req.verifyCredential = email ?? null;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "token no valid",
		});
	}

	next();
};

const validateJWTCorrelative = (req, res = response, next) => {
	const token = req.header("x-token");
	console.log("token", token);

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No token",
		});
	}

	try {
		const { correlative } = jwt.verify(token, process.env.SECRET_JWT_SEED);
		if (!correlative) {
			return res.status(401).json({
				ok: false,
				msg: "No correlative token",
			});
		}
		req.correlative = correlative;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "token no valid",
		});
	}

	next();
};

module.exports = {
	validateJWT,
	validateJWTCorrelative,
};
