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
  idRegisteringEntity = JSON.parse(idRegisteringEntity);
  idRegisteringEntity = idRegisteringEntity?.map((id) => Number(id));

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
      queryPet["created_at"] = { $gte: dateStartParse, $lte: dateEndParse };
    }

    if (address) {
      queryPet["adopter"] = { $regex: address, $options: "i" };
    }

    if (adopter) {
      queryPet["adopterName"] = { $regex: adopter, $options: "i" };
    }
    console.log("query", queryPet);

    if (created_for) {
      queryPet["created_for"] = {
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

    let queryAdopter = {};

    if (dni) {
      queryAdopter["documentNumber"] = { $regex: dni, $options: "i" };
    }

    if (department) {
      queryAdopter["department"] = {
        $regex: department.trim(),
        $options: "i",
      };
    }

    if (province) {
      queryAdopter["province"] = {
        $regex: province.trim(),
        $options: "i",
      };
    }

    if (district) {
      queryAdopter["district"] = {
        $regex: district.trim(),
        $options: "i",
      };
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
        : await Pet.find({
          idRegisteringEntity: { $in: idRegisteringEntity },
          ...queryPet,
        })
          .sort({ created_at: -1 })
          .populate("user");

      console.log({ adopter: adopters[0] });
      console.log({ pet: pets[0] });

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
    // console.log("adopters", adopters);

    return res.status(201).json({
      ok: true,
      pets,
      adopters,
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
};
