const User = require("../model/User");

const getEntityRegister = async (req, res) => {
  const { department, province, district } = req.query;
  console.log(req.query);
  console.log({ department, province, district });

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

        // if (entity.user?.position !== "REGISTRANTE - VET") {
        //   return;
        // }

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

module.exports = {
  getEntityRegister,
  getEntityRegisterById,
};
