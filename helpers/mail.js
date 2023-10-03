const nodemailer = require("nodemailer");
const { template } = require("../mail/mailAdopter");
const { templateReset } = require("../mail/mailReset");
const { templateRequestUser } = require("../mail/mailRequestRegisterUser");
const { templateRequestEntity } = require("../mail/mailRequestRegisterEntity");
const {
	templateRequestUserCard,
} = require("../mail/mailRequestRegisterUserCard");
const {
	templateRequestUserCardRenian,
} = require("../mail/mailRequestRegisterUserCardRenian");
const {
	templateRequestUserRenian,
} = require("../mail/mailRequestRegisterUserRenian");
const path = require("path");

const copyToEmail = "pets@worldanimalregistry.org";

// configuracion mail war
const configWar = () => {
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

// configuracion mail war
const configWarSolicitud = () => {
	return nodemailer.createTransport({
		// host: "mail.firulaixcoin.finance",
		// port: 26,
		host: "mail.worldanimalregistry.org",
		port: 465,
		secure: true,
		auth: {
			// user: "no-reply@firulaixcoin.finance",
			// pass: "No_reply_23",
			user: "solicitudderegistro@worldanimalregistry.org",
			pass: "Noreply_23",
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
};

// configuracion mail renian
const configRenian = () => {
	return nodemailer.createTransport({
		host: "mail.renian.pe",
		port: 465,
		secure: true,
		auth: {
			user: "solicitudderegistro@renian.pe",
			pass: "Solicitud_23",
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
	console.log("email", email);
	try {
		let transporter = configWar();

		await transporter.sendMail({
			// from: '"W.A.R." <notification@firulaixcoin.finance>', // sender address,
			from: "pets@worldanimalregistry.org", // sender address,
			to: [email, copyToEmail],
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: template({ email, password, address, privateKey, title }),
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const mailReset = async ({ email, name, token }) => {
	try {
		let transporter = configWar();
		// console.log("email", email.toLowerCase())
		// const emailLower = email.toLowerCase()

		await transporter.sendMail({
			// from: '"W.A.R." <notification@firulaixcoin.finance>', // sender address,
			from: "pets@worldanimalregistry.org", // sender address,
			to: [email, copyToEmail],
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateReset({ name, token }),
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const mailRegisterEntity = async ({ registry }) => {
	try {
		let transporter = configWarSolicitud();
		// console.log("email", email.toLowerCase())
		// const emailLower = email.toLowerCase()
		// console.log("plantilla", registry)

		await transporter.sendMail({
			from: "solicitudderegistro@worldanimalregistry.org",
			to: [
				registry.email,
				"solicitudderegistro@worldanimalregistry.org",
				copyToEmail,
			],
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateRequestEntity({ registry }),
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const mailRegisterUserWar = async ({ registry, url }) => {
	try {
		const transporter = configWar();
		const to = "solicitudderegistro@worldanimalregistry.org";

		if (!registry.image) {
			await transporter.sendMail({
				from: "solicitudderegistro@worldanimalregistry.org",
				to: [registry.email, to, copyToEmail],
				subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
				html: templateRequestUserCard({ registry, url }),
			});
			return true;
		}

		await transporter.sendMail({
			from: "solicitudderegistro@worldanimalregistry.org",
			to: [registry.email, to, copyToEmail],
			subject: "WORLD ANIMAL REGISTRY - Registro de Usuario",
			html: templateRequestUser({ registry }),
			attachments: [
				{
					filename: "voucher.png",
					path: registry.image,
					contentType: "application/png",
				},
			],
		});

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const mailRegisterUserRenian = async ({ registry, url }) => {
	try {
		const transporter = configRenian();
		const to = "solicitudderegistro@renian.pe";
		console.log({ registry });
		if (registry.image === "") {
			console.log("aqui");
			await transporter.sendMail({
				from: "solicitudderegistro@renian.pe",
				to: [registry.email, to, copyToEmail],
				subject: "RENIAN - Registro de Usuario",
				html: templateRequestUserCardRenian({ registry, url }),
			});
			return true;
		}

		await transporter.sendMail({
			from: "solicitudderegistro@renian.pe",
			to: [registry.email, to, copyToEmail],
			subject: "RENIAN - Registro de Usuario",
			html: templateRequestUserRenian({ registry }),
			attachments: [
				{
					filename: "voucher.png",
					path: registry.image,
					contentType: "application/png",
				},
			],
		});

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	mail,
	mailReset,
	mailRegisterEntity,
	mailRegisterUserWar,
	mailRegisterUserRenian,
};
