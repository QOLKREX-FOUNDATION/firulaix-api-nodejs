const nodemailer = require("nodemailer");
const { template } = require("../mail/mailAdopter");
const { templateReset } = require("../mail/mailReset");

const config = () => {
	return nodemailer.createTransport({
		host: "mail.firulaixcoin.finance",
		port: 26,
		secure: true,
		auth: {
			user: "no-reply@firulaixcoin.finance",
			pass: "NS~a44pClJP",
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
};

const mail = async ({
	email,
	password,
	address,
	privateKey,
	title = "WORLD ANIMAL REGISTRY",
}) => {
	try {
		let transporter = config();

		await transporter.sendMail({
			from: '"W.A.R." <notification@firulaixcoin.finance>', // sender address,
			to: email,
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: template({ email, password, address, privateKey, title }),
		});
		return true;
	} catch (error) {
		return false;
	}
};

const mailReset = async ({
	email,
	name,
	token,
}) => {
	try {
		let transporter = config();

		await transporter.sendMail({
			from: '"W.A.R." <notification@firulaixcoin.finance>', // sender address,
			to: email,
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateReset({ name, token }),
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports = { mail, mailReset };
