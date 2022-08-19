
const nodemailer = require("nodemailer");
const { template } = require("../mail/mailAdopter");

const mail = async ({
	email,
	password,
	address,
	privateKey,
	title = "RENIAN",
}) => {
	try {
		let transporter = nodemailer.createTransport({
			host: "firulaixcoin.finance",
			port: 465,
			secure: true,
			auth: {
				user: "no-reply@firulaixcoin.finance",
				pass: "NS~a44pClJP",
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		await transporter.sendMail({
			from: '"Renian" <notification@firulaixcoin.finance>', // sender address,
			to: email,
			subject: "RENIAN - Registro de Usuario",
			html: template({ email, password, address, privateKey, title }),
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports = { mail };
