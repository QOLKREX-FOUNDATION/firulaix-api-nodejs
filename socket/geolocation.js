// const Item = require("../item/item.model");
// const Votation = require("../votation/votation.model");
const Adopter = require("../model/Adopter");
const Notification = require("../model/Notification");

const getGeolocation = async (payload) => {
  //   const id = payload;
  //   const votation = await Votation.findById(id);
  //   const items = await Item.find({ votation: id });
  //   return {
  //     votation,
  //     items,
  //   };
};

const setGeolocalization = async (payload) => {
  const { id, coords } = payload;
  if (!id) return { msg: "No hay id" };
  if (!coords) return { msg: "No hay coordenadas" };
  const { x: latitude, y: longitude } = coords;
  if (!latitude) return { msg: "No hay latitud" };
  if (!longitude) return { msg: "No hay longitud" };
  try {
    console.log("setGeolocalization", id, latitude, longitude);

    const user = await Adopter.findOne({
      address: id,
    });

    const date = new Date();

    const formattedDate = date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // console.log("user", user);

    // save notification
    const notification = new Notification({
      title: "Geolocalización",
      message: "Se ha registrado una nueva geolocalización",
      type: "geolocation",
      data: {
        coords: {
          latitude,
          longitude,
        },
        user: {
          name: user.name,
          lastName: user.lastName,
          id: user._id,
        },
      },
    });

    await notification.save();

    console.log("notification", notification);

    return {
      ok: true,
      msg: "Geolocalización guardada",
      info: {
        title: "Geolocalización",
        message: "Se ha registrado una nueva geolocalización",
        type: "geolocation",
        data: {
          coords: {
            latitude,
            longitude,
          },
          user: {
            name: user.name,
            lastName: user.lastName,
            id: user._id,
          },
        },
        createdAt: date,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      msg: "Error al guardar las coordenadas",
    };
  }
};

module.exports = {
  getGeolocation,
  setGeolocalization,
};
