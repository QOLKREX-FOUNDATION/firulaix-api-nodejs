// const Item = require("../item/item.model");
// const Votation = require("../votation/votation.model");

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
    return {
      msg: "Coordenadas guardadas",
      coords: {
        latitude,
        longitude,
      },
    };
  } catch (error) {
    return {
      msg: "Error al guardar las coordenadas",
    };
  }
  //   try {
  //     const votation = new Votation(rest);
  //     const votationSaved = await votation.save();
  //     const votationId = votationSaved._id;
  //     const itemsSaved = await Promise.all(
  //       items.map(async (item) => {
  //         const newItem = new Item(item);
  //         newItem.votation = votationId;
  //         await newItem.save();
  //         return newItem;
  //       })
  //     );
  //     return {
  //       msg: "Votación guardada",
  //       votation: votationSaved,
  //       items: itemsSaved,
  //     };
  //   } catch (error) {
  //     return {
  //       msg: "Error al guardar la votación",
  //     };
  //   }
};

module.exports = {
  getGeolocation,
  setGeolocalization,
};
