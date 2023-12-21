const { response } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const Pet = require("../model/Pet");
const Adopter = require("../model/Adopter");
const path = require("path");

const getRecord = async (req, res = response) => {
  const { chip } = req.query;
  try {
    let pet = await Pet.findOne({
      chip,
    });

    let adopter = await Adopter.findOne({
      address: pet.adopter,
    });

    res.json({
      ok: true,
      pet,
      adopter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const getGenealogy = async (req, res = response) => {
  const { chip } = req.params;
  console.log(chip);
  try {
    const pet = await Pet.findOne({
      chip,
    });

    // const adopter = Adopter.findOne({
    //   address: pet.adopter,
    // });

    if (!pet)
      return res.status(400).json({
        ok: false,
        msg: "No exist pet",
      });

    console.log({ chip, pet });

    const { chipFather, chipMother } = pet;
    // console.log({ chipFather, chipMother });

    const father = await Pet.findOne({
      chip: chipFather,
    });

    const mother = await Pet.findOne({
      chip: chipMother,
    });

    const children = await Pet.find({
      $or: [{ chipFather: chip }, { chipMother: chip }],
    });

    console.log({ father, mother, children });

    // if (!father && !mother)
    //   return res.status(200).json({
    //     ok: false,
    //     genealogy: {
    //       son: {
    //         name: pet.name,
    //         chip: pet.chip,
    //       },
    //       father: {
    //         name: "No exist",
    //         chip: "http://via.placeholder.com/640x360",
    //       },
    //       mother: {
    //         name: "No exist",
    //         chip: "http://via.placeholder.com/640x360",
    //       },
    //       children: children.map((child) => ({
    //         name: "No exist",
    //         chip: `http://via.placeholder.com/640x360`,
    //       })),
    //     },
    //   });

    // Obtener abuelos
    let fatherFather, fatherMother, motherFather, motherMother;

    if (father) {
      fatherFather = await Pet.findOne({
        chip: father.chipFather,
      });

      fatherMother = await Pet.findOne({
        chip: father.chipMother,
      });
    }

    if (mother) {
      motherFather = await Pet.findOne({
        chip: mother.chipFather,
      });

      motherMother = await Pet.findOne({
        chip: mother.chipMother,
      });
    }

    // Obtener tatarabuelos
    let fatherFatherFather,
      fatherFatherMother,
      fatherMotherFather,
      fatherMotherMother;
    let motherFatherFather,
      motherFatherMother,
      motherMotherFather,
      motherMotherMother;

    if (fatherFather) {
      fatherFatherFather = await Pet.findOne({
        chip: fatherFather.chipFather,
      });

      fatherFatherMother = await Pet.findOne({
        chip: fatherFather.chipMother,
      });
    }

    if (fatherMother) {
      fatherMotherFather = await Pet.findOne({
        chip: fatherMother.chipFather,
      });

      fatherMotherMother = await Pet.findOne({
        chip: fatherMother.chipMother,
      });
    }

    if (motherFather) {
      motherFatherFather = await Pet.findOne({
        chip: motherFather.chipFather,
      });

      motherFatherMother = await Pet.findOne({
        chip: motherFather.chipMother,
      });
    }

    if (motherMother) {
      motherMotherFather = await Pet.findOne({
        chip: motherMother.chipFather,
      });

      motherMotherMother = await Pet.findOne({
        chip: motherMother.chipMother,
      });
    }

    // return res.status(400).json({
    //   ok: false,
    //   msg: "No exist father or mother",
    // });

    return res.status(200).json({
      ok: true,
      genealogy: {
        son: {
          name: pet.name || "No existe",
          image: `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ pet.chip }`,
          chip: pet.chip,
        },
        father: {
          name: father?.name || "No existe",
          image: father
            ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ father?.chip }`
            : "http://via.placeholder.com/640x360",
          chip: father?.chip,
        },
        mother: {
          name: mother?.name || "No existe",
          image: mother
            ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ mother?.chip }`
            : "http://via.placeholder.com/640x360",
          chip: mother?.chip,
        },
        children: children.map((child) => ({
          name: child?.name || "No existe",
          image: `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ child.chip }`,
        })),
        grandparents: {
          father: {
            father: {
              name: fatherFather?.name || "No existe",
              image: fatherFather
                ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ fatherFather?.chip }`
                : "http://via.placeholder.com/640x360",
              chip: fatherFather?.chip,
            },
            mother: {
              name: fatherMother?.name || "No existe",
              image: fatherMother
                ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ fatherMother?.chip }`
                : "http://via.placeholder.com/640x360",
              chip: fatherMother?.chip,
            },
          },
          mother: {
            father: {
              name: motherFather?.name || "No existe",
              image: motherFather
                ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ motherFather?.chip }`
                : "http://via.placeholder.com/640x360",
              chip: motherFather?.chip,
            },
            mother: {
              name: motherMother?.name || "No existe",
              image: motherMother
                ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ motherMother?.chip }`
                : "http://via.placeholder.com/640x360",
              chip: motherMother?.chip,
            },
          },
        },
        greatGrandparents: {
          father: {
            father: {
              father: {
                name: fatherFatherFather?.name || "No existe",
                image: fatherFatherFather
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ fatherFatherFather?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: fatherFatherFather?.chip,
              },
              mother: {
                name: fatherFatherMother?.name || "No existe",
                image: fatherFatherMother
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ fatherFatherMother?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: fatherFatherMother?.chip,
              },
            },
            mother: {
              father: {
                name: fatherMotherFather?.name || "No existe",
                image: fatherMotherFather
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ fatherMotherFather?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: fatherMotherFather?.chip,
              },
              mother: {
                name: fatherMotherMother?.name || "No existe",
                image: fatherMotherMother
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ fatherMotherMother?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: fatherMotherMother?.chip,
              },
            },
          },
          mother: {
            father: {
              father: {
                name: motherFatherFather?.name || "No existe",
                image: motherFatherFather
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ motherFatherFather?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: motherFatherFather?.chip,
              },
              mother: {
                name: motherFatherMother?.name || "No existe",
                image: motherFatherMother
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ motherFatherMother?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: motherFatherMother?.chip,
              },
            },
            mother: {
              father: {
                name: motherMotherFather?.name || "No existe",
                image: motherMotherFather
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ motherMotherFather?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: motherMotherFather?.chip,
              },
              mother: {
                name: motherMotherMother?.name || "No existe",
                image: motherMotherMother
                  ? `https://res.cloudinary.com/worldanireg/image/upload/v1/images/image/${ motherMotherMother?.chip }`
                  : "http://via.placeholder.com/640x360",
                chip: motherMotherMother?.chip,
              },
            },
          },
        },
      },
      // pet,
      // adopter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const saveRecord = async (req, res = response) => {
  req.body.created_for = req.body.userAddress;
  const pet = new Pet(req.body);
  let msg = "";
  try {
    pet.user = req.uid;

    let find = await Pet.findOne({ chip: req.body.chip });
    if (find) msg = "warOffice.drawers.petsRegistry.modal.chipValidate";
    if (msg) {
      return res.status(400).json({
        ok: false,
        msg: msg,
      });
    }

    const record = await pet.save();

    res.status(201).json({
      ok: true,
      data: record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const updateRecord = async (req, res = response) => {
  try {
    const find = await Pet.findOne({ chip: req.body.chip });

    if (!find) {
      return res.status(401).json({
        ok: false,
        msg: "No exist pet",
      });
    }

    await Pet.findByIdAndUpdate(
      find._id,
      {
        ...req.body,
        update_for: req.body.userAddress,
        update_at: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const deleteRecord = async (req, res = response) => {
  const find = await Pet.findOne({ chip: req.body.chip });

  if (!find) {
    return res.status(401).json({
      ok: false,
      msg: "No exist pet",
    });
  }

  await Pet.findByIdAndRemove(find._id);

  res.status(200).json({
    ok: true,
  });
};

const statusRecord = async (req, res = response) => {
  try {
    const find = await Pet.findOne({ chip: req.body.chip }).populate(
      "user",
      "publicAddress"
    );

    if (!find) {
      return res.status(401).json({
        ok: false,
        msg: "No exist pet",
      });
    }

    if (find.adopter == req.body.address) {
    } else {
      validateJWT;
    }

    await Pet.findByIdAndUpdate(
      find._id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const getHistory = async (req, res = response) => {
  let {
    idRegisteringEntity,
    adopter,
    address,
    pet,
    chip,
    dni,
    dateStart,
    dateEnd,
    limit = "true"
  } = req.query;
  idRegisteringEntity = JSON.parse(idRegisteringEntity);
  idRegisteringEntity = idRegisteringEntity?.map((id) => Number(id));

  try {
    let queryPet = {};

    if (pet) {
      queryPet["name"] = { $regex: pet, $options: "i" };
    }

    if (chip) {
      queryPet["chip"] = { $regex: chip, $options: "i" };
    }

    if (dateStart && dateEnd) {
      const dateStartParse = new Date(dateStart);
      const dateEndParse = new Date(dateEnd);
      console.log({ dateStartParse, dateEndParse });
      dateEndParse.setDate(dateEndParse.getDate() + 1);
      queryPet["created_at"] = { $gte: dateStartParse, $lte: dateEndParse };
    }

    if (address) {
      queryPet["adopter"] = { $regex: address, $options: "i" };
    }

    if (adopter) {
      queryPet["adopterName"] = { $regex: adopter, $options: "i" };
    }
    console.log("query", queryPet);

    let queryAdopter = {};

    if (dni) {
      queryAdopter["documentNumber"] = { $regex: dni, $options: "i" };
    }

    if (limit === "false") {
      let adopters = await Adopter.find({
        idRegisteringEntity,
        ...queryAdopter,
      });

      let pets = dni
        ? await Pet.find({
          idRegisteringEntity: { $in: idRegisteringEntity },
          adopter: { $in: adopters.map((a) => a.address) },
          ...queryPet,
        }).sort({ created_at: -1 })
        : await Pet.find({
          idRegisteringEntity: { $in: idRegisteringEntity },
          ...queryPet,
        }).sort({ created_at: -1 });

      return res.status(201).json({
        ok: true,
        pets,
        adopters,
      });
    }

    let adopters = await Adopter.find({
      idRegisteringEntity,
      ...queryAdopter,
    }).limit(500);

    console.log({ adopters: adopters.length });
    // console.log({ adopters: adopters[0] });

    let pets = dni
      ? await Pet.find({
        idRegisteringEntity: { $in: idRegisteringEntity },
        adopter: { $in: adopters.map((a) => a.address) },
        ...queryPet,
      })
        .sort({ created_at: -1 })
        .limit(500)
      : await Pet.find({
        idRegisteringEntity: { $in: idRegisteringEntity },
        ...queryPet,
      })
        .sort({ created_at: -1 })
        .limit(500);

    console.log({ pets: pets.length });

    return res.status(201).json({
      ok: true,
      pets,
      adopters,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const getHistoryPagination = async (req, res = response) => {
  const { idRegisteringEntity, limit = 5, offset = 0 } = req.query;

  if (!idRegisteringEntity)
    return res
      .status(400)
      .json({ ok: false, msg: "idRegisteringEntity is required" });

  const idRegisteringEntityParse = JSON.parse(idRegisteringEntity);
  console.log(idRegisteringEntityParse);
  const idRegisteringEntityArray = idRegisteringEntityParse?.map((id) =>
    Number(id)
  );
  console.log(idRegisteringEntityArray);

  try {
    const petsTotal = await Pet.find({
      idRegisteringEntity: { $in: idRegisteringEntityArray },
      // idRegisteringEntity,
    }).sort("create_at");

    const pets = await Pet.find({
      idRegisteringEntity: { $in: idRegisteringEntityArray },
      // idRegisteringEntity,
    })
      .limit(Number(limit))
      .skip(Number(offset))
      .sort("create_at");

    const adoptersTotal = await Adopter.find({
      idRegisteringEntity: idRegisteringEntityArray,
    }).sort("create_at");

    const adopters = await Adopter.find({
      idRegisteringEntity: idRegisteringEntityArray,
    })
      .limit(Number(limit))
      .skip(Number(offset))
      .sort("create_at");

    return res.status(201).json({
      ok: true,
      totalPets: petsTotal.length,
      totalAdopters: adoptersTotal.length,
      pets,
      adopters,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        currentPage: Math.ceil(offset / limit) + 1,
        prevPage: Math.ceil(offset / limit),
        nextPage: Math.ceil(offset / limit) + 2,
        totalPages: Math.ceil(petsTotal.length / Number(limit)),
        totalPages2: Math.ceil(adoptersTotal.length / Number(limit)),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const getHistoryReport = async (req, res = response) => {
  let {
    idRegisteringEntity,
    adopter,
    userAddress,
    address,
    pet,
    chip,
    dni,
    created_for,
    dateStart,
    dateEnd,
    department,
    province,
    district,
    typeAnimal,
    typeRace,
    limit = true,
  } = req.query;

  if (idRegisteringEntity === "null") idRegisteringEntity = null;
  idRegisteringEntity = JSON.parse(idRegisteringEntity);
  idRegisteringEntity = idRegisteringEntity?.map((id) => Number(id));

  console.log("params", { address });
  console.log({ department, province, district });

  try {
    console.log({ dateStart, dateEnd });
    let queryPet = {};

    if (pet) {
      queryPet["name"] = { $regex: pet, $options: "i" };
    }

    if (chip) {
      queryPet["chip"] = { $regex: chip, $options: "i" };
    }

    if (dateStart && dateEnd) {
      const dateStartParse = new Date(dateStart);
      const dateEndParse = new Date(dateEnd);
      console.log({ dateStartParse, dateEndParse });
      dateEndParse.setDate(dateEndParse.getDate() + 1);
      // dateStartParse.setHours(0, 0, 0, 0);
      // dateStartParse.setHours(23, 59, 59, 999);
      // dateEndParse.setHours(23, 59, 59, 999);
      console.log({ dateStartParse, dateEndParse });
      queryPet["created_at"] = { $gte: dateStartParse, $lte: dateEndParse };
    }

    if (address) {
      // queryPet["adopter"] = { $regex: address, $options: "i" };
      queryPet["addressEr"] = { $regex: address, $options: "i" };
    }

    if (adopter) {
      queryPet["adopterName"] = { $regex: adopter, $options: "i" };
    }
    console.log("query", queryPet);

    if (userAddress) {
      console.log("userAddress", userAddress);
      queryPet["userAddress"] = {
        $regex: userAddress,
        $options: "i",
      };
    }

    if (created_for) {
      queryPet["userAddress"] = {
        $regex: created_for.toUpperCase(),
        $options: "i",
      };
    }

    if (typeAnimal) {
      queryPet["type"] = {
        $regex: typeAnimal.toUpperCase(),
        $options: "i",
      };
    }

    if (typeRace) {
      queryPet["race"] = {
        $regex: typeRace.toUpperCase(),
        $options: "i",
      };
    }

    let pipeline = [
      {
        $lookup: {
          from: "adopters",
          localField: "adopter",
          foreignField: "address",
          as: "petxadopter",
        },
      },
      {
        $unwind: "$petxadopter",
      },
      {
        $match: {
          ...queryPet,
        },
      },
    ];

    if (department) {
      pipeline.push({
        $match: {
          "petxadopter.department": {
            $regex: department.trim(),
            $options: "i",
          },
        },
      });
    }

    if (province) {
      pipeline.push({
        $match: {
          "petxadopter.province": {
            $regex: province.trim(),
            $options: "i",
          },
        },
      });
    }

    if (district) {
      pipeline.push({
        $match: {
          "petxadopter.district": {
            $regex: district.trim(),
            $options: "i",
          },
        },
      });
    }

    let queryAdopter = {};

    if (dni) {
      queryAdopter["documentNumber"] = { $regex: dni, $options: "i" };
    }

    console.log({ limit });
    console.log(typeof limit);

    if (limit === "false") {
      let adopters = await Adopter.find({
        idRegisteringEntity,
        ...queryAdopter,
      });

      let pets = dni
        ? await Pet.find({
          idRegisteringEntity: { $in: idRegisteringEntity },
          adopter: { $in: adopters.map((a) => a.address) },
          ...queryPet,
        })
          .sort({ created_at: -1 })
          .populate("user")
        : await Pet.aggregate(pipeline).sort({ created_at: -1 });

      console.log(pipeline);

      console.log({ adopter: adopters[0] });
      console.log({ pet: pets[0] });

      return res.status(201).json({
        ok: true,
        pets,
        adopters,
        totalPets: pets.length,
      });
    }

    let adopters = await Adopter.find({
      idRegisteringEntity,
      ...queryAdopter,
    }).limit(500);

    console.log({ adopters: adopters.length });
    // console.log({ adopters: adopters[0] });

    let pets = dni
      ? await Pet.find({
        idRegisteringEntity: { $in: idRegisteringEntity },
        adopter: { $in: adopters.map((a) => a.address) },
        ...queryPet,
      })
        .sort({ created_at: -1 })
        .limit(500)
        .populate("user")
      : await Pet.find({
        idRegisteringEntity: { $in: idRegisteringEntity },
        ...queryPet,
        // idRegisteringEntity,
      })
        .sort({ created_at: -1 })
        .limit(500)
        .populate("user");

    console.log({ pets: pets.length });
    // console.log({ pet1: pets[0] });

    // console.log("pets", pets);
    console.log("pets", pets.length);
    // console.log("adopters", adopters);

    return res.status(201).json({
      ok: true,
      pets,
      adopters,
      totalPets: pets.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const upload = async (req, res = response) => {
  try {
    const { name, chip } = req.body;
    const file = req.files.file;
    // console.log(file, name, chip);
    const url = path.join(__dirname, `../public/images/${ name }/${ chip }.jpg`);
    // console.log("url", url);
    // file.mv(`./public/images/${name}/${chip}.jpg`, (err) => {
    file.mv(url, (err) => {
      //   console.log("err", err);
      if (err) return res.status(500).send({ message: err });
      res.status(201).json({
        ok: true,
        message: "File upload",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const getAdopterPets = async (req, res = response) => {
  try {
    const adopter = await Adopter.findOne({ email: req.verifyCredential });
    const pets = await Pet.find({ adopter: adopter.address });

    res.status(201).json({
      ok: true,
      pets,
      adopter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

// const getRecords = async (req, res = response) => {
// 	try {
// 		const { query, hash = null } = req.query;
// 		const initial = 0 + Number(query);
// 		const end = 10 + Number(query);

// 		let find = await Pet.find();

// 		find.map(async (pet) => {
// 			let idRegisteringEntity = pet.idRegisteringEntity;

// 			if (
// 				(pet.userAddress === "0XDDD166057ACFCE35F236B771CEB62C8ADE9E71DA",
// 				pet.userAddress === "0X9A1E9669109C244ABAB7162AECFBA239C34572AB",
// 				pet.userAddress === "0XBA3309A2823DD1FC2DE44473C78F4B911806A17E")
// 			) {
// 				idRegisteringEntity = pet.idRegisteringEntity;
// 			} else if (pet.idRegisteringEntity === 3) {
// 				idRegisteringEntity = 2;
// 			} else if (pet.idRegisteringEntity === 4) {
// 				idRegisteringEntity = 3;
// 			}

// 			await Pet.findByIdAndUpdate(
// 				pet._id,
// 				{
// 					idRegisteringEntity,
// 				},
// 				{ new: true }
// 			);
// 		});

// 		// const pet = [];

// 		// find.map((p, i) => {
// 		// 	if (i >= initial && i < end) {
// 		// 		pet.push(p);
// 		// 	}
// 		// });

// 		// if (hash) {
// 		// 	pet.map(async (p) => {
// 		// 		await Pet.findByIdAndUpdate(
// 		// 			p._id,
// 		// 			{
// 		// 				hash,
// 		// 			},
// 		// 			{ new: true }
// 		// 		);
// 		// 	});
// 		// }

// 		res.json({
// 			ok: true,
// 			// pet,
// 			// initial,
// 			// end,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({
// 			ok: false,
// 			msg: "Error, contact Admin",
// 		});
// 	}
// };

module.exports = {
  getRecord,
  // getRecords,
  saveRecord,
  updateRecord,
  deleteRecord,
  statusRecord,
  getHistory,
  getHistoryPagination,
  getHistoryReport,
  getAdopterPets,
  upload,
  getGenealogy
};
