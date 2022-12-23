const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../model/User");
const ethUtil = require("ethereumjs-util");
const web3Util = require("web3-utils");

const getRecord = async (req, res = response) => {
	req.query.publicAddress = String(req.query.publicAddress).toUpperCase();
	const { publicAddress } = req.query;
	try {
		const user = await User.findOne({ publicAddress });

		res.status(201).json({
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "error system",
		});
	}
};

const createRecord = async (req, res = response) => {
	try {
		req.body.publicAddress = String(req.body.publicAddress).toUpperCase();

		const { publicAddress } = req.body;
		let newUser = await User.findOne({ publicAddress });

		if (newUser) {
			await User.findByIdAndUpdate(
				newUser._id,
				{
					...req.body,
				},
				{ new: true }
			);
		} else {
			newUser = new User({ ...req.body});
			newUser.created_for = publicAddress;
			await newUser.save();
		}
		res.status(201).json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "error system",
		});
	}
};

const login = async (req, res = response) => {
	try {
		req.body.publicAddress = String(req.body.publicAddress).toUpperCase();
		const { publicAddress, signature } = req.body;
		const user = await User.findOne({ publicAddress });
		const msg = web3Util.utf8ToHex(`0x${user.nonce}`);

		const msgBuffer = ethUtil.toBuffer(msg);
		const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
		const signatureBuffer = ethUtil.toBuffer(signature);
		const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
		const publicKey = ethUtil.ecrecover(
			msgHash,
			signatureParams.v,
			signatureParams.r,
			signatureParams.s
		);

		const addressBuffer = ethUtil.publicToAddress(publicKey);
		const address = ethUtil.bufferToHex(addressBuffer);

		if (address.toUpperCase() === publicAddress.toUpperCase()) {
			const token = await generateJWT(user.id, user.address);
			user.nonce = Math.floor(Math.random() * 1000000);

			await User.findByIdAndUpdate(user._id, { ...user }, { new: true });

			res.json({
				ok: true,
				token,
				er: user.er,
			});
		} else {
			res.status(401).json({
				ok: false,
				error: "Signature verification failed",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "error system",
		});
	}
};

module.exports = {
	getRecord,
	login,
	createRecord,
};
