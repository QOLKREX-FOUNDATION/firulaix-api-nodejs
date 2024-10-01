const { request, response } = require("express");
const Pet = require("../model/Pet");
const User = require("../model/User");
const Adopter = require("../model/Adopter");

const getStatistics = async (req = request, res = response) => {
  try {
    const pets = await Pet.find();

    const usersAddressEr = await User.find({
      publicAddress: {
        $in: pets.map((pet) => pet.addressEr),
      },
    });

    const users = await User.find();

    const adopters = await Adopter.find().populate("user");

    // console.log(adopters);

    // console.log(userWithPet);
    // console.log(userWithPet.length);

    // clasificame las mascotas por entidad registradora
    // y creame un array con las mascotas que tengan la misma entidad registradora

    // const petsWithRegisteringEntity = pets.map((pet) => {
    //   const user = users.find((user) => user.publicAddress === pet.addressEr);
    //   return {
    //     pet,
    //     user,
    //   };
    // });

    const petsWithRegisteringEntity = usersAddressEr.map((user) => {
      const userPets = pets.filter(
        (pet) => pet.addressEr === user.publicAddress
      );

      return {
        label: user.entityRegister.name,
        pets: userPets.length,
      };
    });

    const userWithRegisteringEntity = users.map((user) => {
      const userAdopters = adopters.filter(
        (adopter) =>
          adopter.user && adopter.user.publicAddress === user.publicAddress
      );
      // console.log(user);
      return {
        label: `${user.user.name} - ${user.user.lastName}`,
        adopters: userAdopters.length,
      };
    });

    // console.log(userWithRegisteringEntity);

    // console.log(petsWithRegisteringEntity);
    // console.log(petsWithRegisteringEntity.length);

    // registros de mascotas por mes de este año

    const startDate = new Date(`${new Date().getFullYear()}-01-01`); //`${new Date().getFullYear()}-01-01
    const endDate = new Date(`${new Date().getFullYear()}-12-31`); //`${new Date().getFullYear()}-12-31

    const petsFiltered = await Pet.find({
      created_at: { $gte: startDate, $lte: endDate },
    });

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const petsByMonthArray = months.map((month) => {
      const petsByMonth = petsFiltered.filter((pet) => {
        return new Date(pet.created_at).getMonth() === months.indexOf(month);
      });

      return {
        quantity: petsByMonth.length,
        month: month,
      };
    });

    const adoptersFiltered = await Adopter.find({
      created_at: { $gte: startDate, $lte: endDate },
    });

    const adoptersByMonthArray = months.map((month) => {
      const adoptersByMonth = adoptersFiltered.filter((adopter) => {
        return (
          new Date(adopter.created_at).getMonth() === months.indexOf(month)
        );
      });

      return {
        quantity: adoptersByMonth.length,
        month: month,
      };
    });

    // console.log(petsByMonthArray);

    // mascotas por type

    const petsByType = ["CAT", "DOG", "RABBIT", "MACAW", "HORSE", "BIRD"];

    const petsByBreedArray = petsByType.map((breed) => {
      const petsByBreed = petsFiltered.filter((pet) => pet.type === breed);

      return {
        quantity: petsByBreed.length,
        breed: breed,
      };
    });

    console.log(petsByBreedArray);

    // mascotas por race

    // array de razas sin repetir

    const petsByRace = pets.map((pet) => pet.race);
    const petsByRaceNoRepeat = [...new Set(petsByRace)];

    // console.log(petsByRaceNoRepeat);

    // array de razas con cantidad

    const petsByRaceArray = petsByRaceNoRepeat.map((race) => {
      const petsbyRaceFiltered = pets.filter((pet) => pet.race === race);

      return {
        quantity: petsbyRaceFiltered.length,
        race,
      };
    });

    // console.log(petsByRaceArray);

    return res.status(200).json({
      ok: true,
      petsWithRegisteringEntity,
      userWithRegisteringEntity,
      petsByMonthArray,
      adoptersByMonthArray,
      petsByBreedArray,
      petsByRaceArray,
      // userWithRegisteringEntity,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const getStatisticsByAddress = async (req = request, res = response) => {
  try {
    const { address } = req.body;
    const addressesParse = JSON.parse(address); // Cambio aquí para recibir un array
    const addresses = addressesParse.map((a) => a.toUpperCase());

    console.log({ addresses });

    const pets = await Pet.find({
      $or: [
        { addressEr: { $in: addresses } },
        { userAddress: { $in: addresses } },
      ],
    });

    const usersAddressEr = await User.find({
      publicAddress: { $in: addresses },
    });

    const users = await User.find({
      publicAddress: { $in: addresses },
    });

    const adopters = await Adopter.find({
      // address: { $in: addresses },
      // }).populate("user");
    });

    const petsWithRegisteringEntity = usersAddressEr.map((user) => {
      const userPets = pets.filter(
        (pet) =>
          pet.addressEr === user.publicAddress ||
          pet.userAddress === user.publicAddress
      );

      // console.log({ user });

      return {
        label: user.user.name + " " + user.user.lastName,
        pets: userPets.length,
      };
    });

    console.log({ adopters: adopters.length });

    const userWithRegisteringEntity = users.map((user) => {
      const userAdopters = adopters.filter(
        (adopter) => adopter.created_for === user.publicAddress.toUpperCase()
      );

      // console.log({ aqui: user });
      console.log({ adopter1: adopters[1] });
      // console.log({ userAdopters: userAdopters });

      return {
        label: `${user.user.name} - ${user.user.lastName}`,
        adopters: userAdopters.length,
      };
    });

    const startDate = new Date(`${new Date().getFullYear()}-01-01`);
    const endDate = new Date(`${new Date().getFullYear()}-12-31`);

    const petsFiltered = await Pet.find({
      created_at: { $gte: startDate, $lte: endDate },
      addressEr: { $in: addresses },
    });

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const petsByMonthArray = months.map((month) => {
      const petsByMonth = petsFiltered.filter((pet) => {
        return new Date(pet.created_at).getMonth() === months.indexOf(month);
      });

      return {
        quantity: petsByMonth.length,
        month: month,
      };
    });

    const adoptersFiltered = await Adopter.find({
      created_at: { $gte: startDate, $lte: endDate },
      address: { $in: addresses },
    });

    const adoptersByMonthArray = months.map((month) => {
      const adoptersByMonth = adoptersFiltered.filter((adopter) => {
        return (
          new Date(adopter.created_at).getMonth() === months.indexOf(month)
        );
      });

      return {
        quantity: adoptersByMonth.length,
        month: month,
      };
    });

    const petsByType = ["CAT", "DOG", "RABBIT", "MACAW", "HORSE", "BIRD"];

    const petsByBreedArray = petsByType.map((breed) => {
      const petsByBreed = petsFiltered.filter((pet) => pet.type === breed);

      return {
        quantity: petsByBreed.length,
        breed: breed,
      };
    });

    // const petsByRaceArray = pets.map((pet) => pet.race);
    // const petsByRaceNoRepeat = [...new Set(petsByRaceArray)];

    // const petsByRaceArrayWithQuantity = petsByRaceNoRepeat.map((race) => {
    //   const petsByRaceFiltered = petsFiltered.filter(
    //     (pet) => pet.race === race
    //   );

    //   return {
    //     quantity: petsByRaceFiltered.length,
    //     race,
    //   };
    // });

    return res.status(200).json({
      ok: true,
      petsWithRegisteringEntity,
      userWithRegisteringEntity,
      petsByMonthArray,
      adoptersByMonthArray,
      petsByBreedArray,
      // petsByRaceArray: petsByRaceArrayWithQuantity,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const statsPets = async (req = request, res = response) => {
  const { addresses, year } = req.body;
  if (!addresses || !year)
    return res
      .status(400)
      .json({ ok: false, msg: "addresses and year are required" });
  if (typeof addresses !== "object")
    return res
      .status(400)
      .json({ ok: false, msg: "addresses must be an array" });
  const addressesToUpperCase = addresses.map((address) =>
    address.toUpperCase()
  );

  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
  try {
    const pets = await Pet.aggregate([
      {
        $match: {
          $or: [
            { addressEr: { $in: addressesToUpperCase } },
            { userAddress: { $in: addressesToUpperCase } },
          ],
          dateRegistring: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userAddress",
          foreignField: "publicAddress",
          as: "user",
        },
      },
    ]);
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const petsByMonthArray = months.map((month) => {
      const petsByMonth = pets.filter((pet) => {
        return (
          new Date(pet.dateRegistring).getMonth() === months.indexOf(month)
        );
      });
      return {
        quantity: petsByMonth.length,
        month: month,
      };
    });

    const petReduce = pets.reduce((acc, pet) => {
      const userName = pet.user[0].user.name;
      const personType = pet.user[0].user.typePerson;
      const nameToShow =
        personType === "NATURAL" ? userName : pet.user[0].user.lastName;

      if (!acc[nameToShow]) {
        acc[nameToShow] = [];
      }

      acc[nameToShow].push(pet);

      return acc;
    }, {});

    const petsPerAdopter = Object.entries(petReduce).map(
      ([nameToShow, items]) => {
        return {
          label: nameToShow,
          pets: items.length,
          // items,
        };
      }
    );

    return res.send({
      ok: true,
      total: pets.length,
      petsByMonthArray,
      petsPerAdopter,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const statsAdopter = async (req = request, res = response) => {
  const { year, idsEntity } = req.body;
  if (!year) return res.status(400).json({ ok: false, msg: "year required" });
  if (!idsEntity)
    return res.status(400).json({ ok: false, msg: "idsEntity required" });
  if(typeof idsEntity !== 'object') return res.status(400).json({ ok: false, msg: "idsEntity must be an array" });
  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const adopters = await Adopter.aggregate([
    {
      $match: {
        created_at: { $gte: startDate, $lte: endDate },
        idRegisteringEntity: { $in: idsEntity },
      },
    },
  ]);

  const adoptersByMonthArray = months.map((month) => {
    const adoptersByMonth = adopters.filter((adopter) => {
      return new Date(adopter.created_at).getMonth() === months.indexOf(month);
    });

    return {
      adopters: adoptersByMonth.length,
      label: month,
    };
  });

  return res.send({
    ok: true,
    total: adopters.length,
    adoptersByMonthArray,
    adopters,
  });
};

module.exports = {
  getStatistics,
  getStatisticsByAddress,
  statsPets,
  statsAdopter,
};
