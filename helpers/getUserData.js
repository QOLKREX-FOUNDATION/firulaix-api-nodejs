const Adopter = require("../model/Adopter");
const User = require("../model/User");

const getEntityRegister = async (entityAddress) => {
  try {
    const userById = await User.findOne({
      address: entityAddress,
    });
    console.log("userById", userById);
    return userById;
  } catch (error) {
    console.log(error);
  }
};

const getAdopter = async (address) => {
  try {
    const adopterById = await Adopter.findOne({
      address,
    });
    console.log("adopterById", adopterById);
    return adopterById;
  } catch (error) {
    console.log(error);
  }
};

const getEntityByAdopter = async (adopterAddress) => {
  try {
    const user = await Adopter.findOne({
      address: adopterAddress,
    });

    const entity = await User.findOne({
      publicAddress: user.created_for,
    });

    // console.log("user", entity);

    return {
      user,
      entity,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEntityRegister,
  getAdopter,
  getEntityByAdopter,
};
