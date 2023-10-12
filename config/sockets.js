const { getEntityByAdopter } = require("../helpers/getUserData");
const {
  getGeolocation,
  createPosition,
  setGeolocalization,
} = require("../socket");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connect", async (socket) => {
      // Escuchar cuando el cliente cree una votacion
      console.log("cliente conectado");
      // socket.on("create-votation", async (payload) => {
      // const votation = await createVotation(payload);
      //   try {
      //     console.log("create-votation");
      //     await createVotation(payload);
      //     this.io.emit("get-votations", await getVotations());
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });

      socket.on("set-location", async (payload) => {
        const { id, coords } = payload;
        console.log("set-location llegando", id, coords);
        try {
          // if coords x:0 y:0
          if (!coords || coords.x === 0 || coords.y === 0) return;
          // el id es el address del adoptante
          const { user, entity } = await getEntityByAdopter(id);
          const objectIdString = user._id.toString();
          console.log("user.address", objectIdString);
          console.log("entity.publicAddress", entity.publicAddress);

          const result = await setGeolocalization(payload);

          this.io.emit(`set-location context ${ objectIdString }`, result);
          this.io.emit(`set-location context ${ entity.publicAddress }`, result);
        } catch (error) {
          console.log(error);
        }
      });
    });
    // On disconnection
    this.io.on("disconnect", () => {
      console.log("cliente desconectado");
    });
  }
}

module.exports = Sockets;
