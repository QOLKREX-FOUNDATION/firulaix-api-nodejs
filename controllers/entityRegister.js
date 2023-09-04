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
    const filteredEntitiesByDepartment = filteredEntities.filter((entity) => {
      return entity?.department === department;
    });

    // filter entities by province
    const filteredEntitiesByProvince = filteredEntitiesByDepartment.filter(
      (entity) => {
        return entity?.province === province;
      }
    );

    // filter entities by district
    const filteredEntitiesByDistrict = filteredEntitiesByProvince.filter(
      (entity) => {
        // console.log("entity", entity.local);
        // console.log("district", district);
        // return entity?.district === district;
        return entity?.local.trim() === district.trim();
      }
    );

    // console.log("filteredEntitiesByDistrict", filteredEntitiesByDistrict);


    // res.status(200).json({
    //   ok: true,
    //   total: filteredEntities.length,
    //   entityRegister: filteredEntities,
    // });
    res.status(200).json({
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

module.exports = {
  getEntityRegister,
};
