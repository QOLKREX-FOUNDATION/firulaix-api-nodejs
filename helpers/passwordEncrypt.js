const bcrypt = require("bcrypt");

const passwordEncrypt = (password, saltRounds) => {
	return bcrypt.hashSync(password, saltRounds);
};

const passwordDencrypt = (password, hash) => {
	return bcrypt.compareSync(password, hash); // true
};

module.exports = {
	passwordEncrypt,
	passwordDencrypt,
};
