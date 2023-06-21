
const { mailRegisterEntity, mailRegisterUserWar } = require("../helpers/mail");

const requestRegisterEntity = async (req, res) => {
    try {
        // console.log(req.body)
        if (req.body) {
            const sendEmail = await mailRegisterEntity({
                registry: req.body,
            });
        }

        return res.status(201).json({
            ok: true,
            // sendEmail,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contact Admin",
        });
    }
}

const requestRegisterUser = async (req, res) => {
    try {
        // console.log(JSON.stringify(req.body));
        if (req.body) {
            const sendEmail = await mailRegisterUserWar({
                registry: req.body,
            });
        }

        return res.status(201).json({
            ok: true,
            // sendEmail,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contact Admin",
        });
    }
}

module.exports = {
    requestRegisterEntity,
    requestRegisterUser
}