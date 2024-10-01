// const Item = require("../item/item.model");
// const Votation = require("../votation/votation.model");
const { formatPhone } = require("../helpers/formatPhone");
const Adopter = require("../model/Adopter");
const Notification = require("../model/Notification");
const Pet = require("../model/Pet");
const User = require("../model/User");

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
  const { id, petId, coords } = payload;
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

    const pet = await Pet.findOne({
      chip: petId,
    });

    const entity = await User.findOne({
      publicAddress: user.created_for,
    });

    // console.log({ user });
    // console.log({ pet });

    const date = new Date();

    const formattedDate = date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // console.log("user", user);
    // console.log("pet", pet);

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
        pet: {
          name: pet.name,
          chip: pet.chip,
        },
      },
    });

    console.log({ notification });

    await notification.save();

    console.log("notification", notification);

    console.log({ entity });

    const entityFormatted = `${ entity?.user?.name } ${ entity?.user?.phone ? entity?.user?.phone : ""
      }`;

    // format phone
    const formatNumber = formatPhone(user.phone);

    createMessage({
      to: `whatsapp:+${ formatNumber }`,
      body: `Su mascota Fue avistada! 🌍🦁
      ¡Hola ${ user.name }!
      
      Tenemos buenas noticias. Han ubicado a tu mascota y queremos ayudarte a reunirte con ella.
      Ubicación actual: https://www.google.com/maps/search/?api=1&query=${ latitude },${ longitude }
      
      Por favor, sigue el enlace de Google Maps para ver la ubicación aproximada. 
      Si necesitas ayuda adicional, por favor, no dudes en contactarte con tu entidad registradora ${ entityFormatted } para ayudarte
      NO RESPONDAS A ESTE NÚMERO
      #renian #WorldAnimalPlatform #AmantesDeLosAnimales #SalvemosALosAnimales`,
    });

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
          pet: {
            name: pet.name,
            chip: pet.chip,
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
