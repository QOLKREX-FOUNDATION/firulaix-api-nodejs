const User = require("../model/User");

const getEntityRegister = async (req, res) => {
  try {
    const entityRegister = await User.find();

    // filter entities without name
    const responseEntityRegisterFilter = entityRegister.filter((entity) => {
      // console.log(entity.user.name);
      return entity.user.name !== undefined;
    });

    const responseEntityRegister = responseEntityRegisterFilter.map(
      (entity) => {
        // console.log(entity.user.position);
        // console.log(typeof entity.user.position);
        if (entity.user?.position !== "REGISTRANTE - VET") {
          return;
        }

        return {
          id: entity._id,
          name: entity.user.name,
          // nameEntity: entity.entityRegister.name,
          lastName: entity.user.lastName,
          local: entity.user.local,
        };
      }

      //   return {
      //     id: entity._id,
      //     name: entity.user.name,
      //     // nameEntity: entity.entityRegister.name,
      //     lastName: entity.user.lastName,
      //     local: entity.user.local,
      //   };
      // }
    );

    const filteredEntities = responseEntityRegister.filter((entity) => {
      return entity !== undefined;
    });

    res.status(200).json({
      ok: true,
      total: filteredEntities.length,
      entityRegister: filteredEntities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getEntityRegister,
};
