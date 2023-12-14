const Adopter = require("../model/Adopter");
const User = require("../model/User");

const getEntityRegister = async (req = request, res = response) => {
  const { department, province, district, address } = req.query;
  console.log(req.query);
  console.log({ department, province, district });

  let queryEntities = {};

  if (address !== undefined) {
    queryEntities = {
      publicAddress: { $regex: address, $options: "i" },
    };
  }

  try {
    const entityRegister = await User.find(queryEntities);

    if (district === "") {
      return res.status(200).json({
        ok: true,
        total: 0,
        entityRegister: [],
      });
    }

    // filter entities without name
    const responseEntityRegisterFilter = entityRegister.filter((entity) => {
      // console.log(entity.user.name);
      return entity.user.name !== undefined;
    });

    const responseEntityRegister = responseEntityRegisterFilter.map(
      (entity) => {
        // console.log(entity.user.position);
        // console.log(typeof entity.user.position);

        // if (entity.user?.position !== "REGISTRANTE - VET") {
        //   return;
        // }

        if (entity.user?.typePerson === "NATURAL") {
          return;
        }

        return {
          id: entity._id,
          name: entity.user.name,
          // nameEntity: entity.entityRegister.name,
          lastName: entity.user.lastName,
          local: entity.user.local,
          phone: entity.user.phone,
          department: entity.user.department,
          province: entity.user?.province,
          district: entity.user?.district,
          phone: entity.user.phone,
          direction: entity.user.direction,
          address: entity.publicAddress,
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

    console.log(responseEntityRegister.length);
    // console.log("responseEntityRegister", responseEntityRegister);

    // filter entities without name
    const filteredEntities = responseEntityRegister.filter((entity) => {
      return entity !== undefined;
    });

    // filter entities by department
    const filteredEntitiesByDepartment = department
      ? filteredEntities.filter((entity) => {
        return entity?.department === department;
      })
      : filteredEntities;

    // filter entities by province
    const filteredEntitiesByProvince = province
      ? filteredEntitiesByDepartment.filter((entity) => {
        return entity?.province === province;
      })
      : filteredEntitiesByDepartment;

    // filter entities by district
    const filteredEntitiesByDistrict = district
      ? filteredEntitiesByProvince.filter((entity) => {
        // console.log("entity", entity.district);
        // console.log("district", district);
        // return entity?.district === district;
        return entity?.district === district.toUpperCase();
      })
      : filteredEntitiesByProvince;

    // console.log("filteredEntitiesByDistrict", filteredEntitiesByDistrict);

    // res.status(200).json({
    //   ok: true,
    //   total: filteredEntities.length,
    //   entityRegister: filteredEntities,
    // });
    return res.status(200).json({
      ok: true,
      total: filteredEntitiesByDistrict.length,
      entityRegister: filteredEntitiesByDistrict,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const getEntityRegisterById = async (req = request, res = response) => {
  const { id } = req.params;
  // console.log(req.query);
  // console.log({ department, province, district });

  try {
    if (id === "undefined") {
      return res.status(200).json({
        ok: true,
        total: 0,
        entityRegister: [],
      });
    }

    const entityRegister = await User.find({
      _id: id,
    });

    // filter entities without name
    const responseEntityRegisterFilter = entityRegister.filter((entity) => {
      // console.log(entity.user.name);
      return entity.user.name !== undefined;
    });

    const responseEntityRegister = responseEntityRegisterFilter.map(
      (entity) => {
        return {
          id: entity._id,
          address: entity.publicAddress,
          name: entity.user.name,
          lastName: entity.user.lastName,
          local: entity.user.local,
          phone: entity.user.phone,
          department: entity.user.department,
          province: entity.user?.province,
          district: entity.user?.district,
          country: entity.entityRegister.country,
        };
      }
    );

    console.log(responseEntityRegister.length);

    return res.status(200).json({
      ok: true,
      total: responseEntityRegister.length,
      entityRegister: responseEntityRegister,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const getEntityRegisterByAddress = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    if (id === "undefined") {
      return res.status(200).json({
        ok: true,
        total: 0,
        entityRegister: [],
      });
    }
    const entityRegister = await User.findOne({
      publicAddress: id.toUpperCase(),
    });
    // if(!entityRegister){
    //   const adopter = await User.findOne({
    //     address: id,
    //   });
    //   const adopterObject = adopter.toObject();
    //   return res.status(200).json({
    //     ...adopterObject
    //   });
    // }
    // console.log(entityRegister)
    return res.status(200).json({
      ...entityRegister.entityRegister,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
      // error,
    });
  }
}

const getInfoByAdddress = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findOne({
    address: id,
  })
  return res.send({
    ok: true,
    user,
  });
}

module.exports = {
  getEntityRegister,
  getEntityRegisterById,
  getEntityRegisterByAddress,
  getInfoByAdddress
};
