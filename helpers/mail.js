const nodemailer = require("nodemailer");
const { template } = require("../mail/mailAdopter");
const { templateReset } = require("../mail/mailReset");
const { templateRequestUser } = require("../mail/mailRequestRegisterUser");
const { templateRequestEntity } = require("../mail/mailRequestRegisterEntity");

const config = () => {
	return nodemailer.createTransport({
		// host: "mail.firulaixcoin.finance",
		// port: 26,
		host: "mail.worldanimalregistry.org",
		port: 465,
		secure: true,
		auth: {
			// user: "no-reply@firulaixcoin.finance",
			// pass: "No_reply_23",
			user: "no-reply@worldanimalregistry.org",
			pass: "Noreply_23",
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
};
// host: "qolkrex.foundation",
// 		port: 465,
// 		secure: true,
// 		auth: {
// 			// user: "no-reply@firulaixcoin.finance",
// 			// pass: "No_reply_23",
// 			user: "no-reply@qolkrex.foundation",
// 			pass: "Noreplyqolkrex_23",
// 		},

const mail = async ({
	email,
	password,
	address,
	privateKey,
	title = "WORLD ANIMAL REGISTRY",
}) => {
	console.log("email", email)
	try {
		let transporter = config();

		await transporter.sendMail({
			// from: '"W.A.R." <notification@firulaixcoin.finance>', // sender address,
			from: 'pets@worldanimalregistry.org', // sender address,
			to: email,
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: template({ email, password, address, privateKey, title }),
		});
		return true;
	} catch (error) {
		console.log(error)
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
		// console.log("email", email.toLowerCase())
		// const emailLower = email.toLowerCase()

		await transporter.sendMail({
			// from: '"W.A.R." <notification@firulaixcoin.finance>', // sender address,
			from: 'pets@worldanimalregistry.org', // sender address,
			to: email,
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateReset({ name, token }),
		});
		return true;
	} catch (error) {
		console.log(error)
		return false;
	}
};

const mailRegisterEntity = async ({
	registry,
}) => {
	try {
		let transporter = config();
		// console.log("email", email.toLowerCase())
		// const emailLower = email.toLowerCase()
		// console.log("plantilla", registry)

		await transporter.sendMail({
			from: 'solicitudderegistro@worldanimalregistry.org',
			to: [registry.email, 'solicitudderegistro@worldanimalregistry.org'],
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateRequestEntity({ registry }),
		});
		return true;
	} catch (error) {
		console.log(error)
		return false;
	}
};

const mailRegisterUser = async ({
	registry,
}) => {
	try {
		let transporter = config();
		// console.log("email", email.toLowerCase())
		// const emailLower = email.toLowerCase()
		// console.log("plantilla", JSON.parse(registry))

		await transporter.sendMail({
			from: 'solicitudderegistro@worldanimalregistry.org',
			to: [registry.email, 'solicitudderegistro@worldanimalregistry.org'],
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateRequestUser({ registry }),
			attachments: [
				{
					filename: 'voucher.png',
					path: registry.image,
					contentType: 'application/png'
				},
			]
		});
		return true;
	} catch (error) {
		console.log(error)
		return false;
	}
};

module.exports = { mail, mailReset, mailRegisterEntity, mailRegisterUser };
