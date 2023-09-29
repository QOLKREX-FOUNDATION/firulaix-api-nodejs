// controller for quantity
// getQuantityPets
// getQuantityEntityRegister
const Adopter = require("../model/Adopter");
const Pet = require("../model/Pet");
const User = require("../model/User");

const getQuantityPets = async (req, res) => {

    try {
        const quantityPets = await Pet.countDocuments({ status: 'ACTIVE' });
        return res.status(200).json({
            ok: true,
            quantityPets,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contact Admin",
        });
    }
}

const getQuantityEntityRegister = async (req, res) => {

    try {
        const quantityEntityRegister = await User.countDocuments();
        console.log({ quantityEntityRegister });
        return res.status(200).json({
            ok: true,
            quantityEntityRegister,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contact Admin",
        });
    }
}
const getQuantityAdopters = async (req, res) => {

    try {
        const quantityEntityRegister = await Adopter.countDocuments({ status: true });
        console.log({ quantityEntityRegister });
        return res.status(200).json({
            ok: true,
            quantityEntityRegister,
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
    getQuantityPets,
    getQuantityEntityRegister,
    getQuantityAdopters
}
// Compare this snippet from controllers\users.js:
