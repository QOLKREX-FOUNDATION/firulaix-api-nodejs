const ExcelJS = require("exceljs");
const Adopter = require("../model/Adopter");
const Pet = require("../model/Pet");
const User = require("../model/User");

const generateExcelReport = async (data) => {
  try {
    const {
      created_at,
      name,
      surname,
      email,
      country,
      phone,
      dni,
      pet,
      race,
      gender,
      chip,
      chip_date,
      type_pet,
      date,
      colour,
      sterilized,
      registeringEntity,
      registeringUser,
      department,
      province,
      district,
      typeAnimal,
      typeRace,
      entity,
    } = data;

    console.log(district);

    // Crear una instancia de ExcelJS
    const workbook = new ExcelJS.Workbook();

    // Crear una nueva hoja de cálculo
    const worksheet = workbook.addWorksheet("Reporte");

    // Definir estilos de formato
    const boldFont = { bold: true };
    const italicFont = { italic: true };

    // Aplicar formato a las celdas
    worksheet.getCell("A1").font = boldFont;
    worksheet.getCell("B1").font = boldFont;
    worksheet.getCell("C1").font = boldFont;
    worksheet.getCell("D1").font = boldFont;
    worksheet.getCell("E1").font = boldFont;
    worksheet.getCell("F1").font = boldFont;
    worksheet.getCell("G1").font = boldFont;
    worksheet.getCell("H1").font = boldFont;
    worksheet.getCell("I1").font = boldFont;
    worksheet.getCell("J1").font = boldFont;
    worksheet.getCell("K1").font = boldFont;
    worksheet.getCell("L1").font = boldFont;
    worksheet.getCell("M1").font = boldFont;
    worksheet.getCell("N1").font = boldFont;
    worksheet.getCell("O1").font = boldFont;
    worksheet.getCell("P1").font = boldFont;
    worksheet.getCell("Q1").font = boldFont;
    worksheet.getCell("R1").font = boldFont;

    // Definir las cabeceras de las columnas
    const columns = [];
    // { header: "VACUNAS", key: "vaccines", width: 15 },

    created_at &&
      columns.push({ header: "REGISTRO", key: "created_at", width: 15 }),
      name && columns.push({ header: "NOMBRE", key: "name", width: 15 }),
      surname &&
      columns.push({ header: "APELLIDO", key: "surname", width: 15 }),
      email &&
      columns.push({ header: "CORREO ELECTRÓNICO", key: "email", width: 30 }),
      country && columns.push({ header: "PAÍS", key: "country", width: 15 }),
      country &&
      columns.push({ header: "DEPARTAMENTO", key: "department", width: 15 }),
      country &&
      columns.push({ header: "PROVINCIA", key: "province", width: 15 }),
      country &&
      columns.push({ header: "DISTRITO", key: "district", width: 15 }),
      phone && columns.push({ header: "TELÉFONO", key: "phone", width: 18 }),
      dni && columns.push({ header: "DNI", key: "dni", width: 18 }),
      pet && columns.push({ header: "MASCOTA", key: "pet", width: 18 }),
      race && columns.push({ header: "RAZA", key: "race", width: 18 }),
      gender && columns.push({ header: "GÉNERO", key: "gender", width: 18 }),
      chip && columns.push({ header: "CHIP", key: "chip", width: 15 }),
      chip_date &&
      columns.push({ header: "FECHA DE CHIP", key: "chip_date", width: 15 }),
      type_pet &&
      columns.push({ header: "TIPO DE MASCOTA", key: "type_pet", width: 18 }),
      date &&
      columns.push({ header: "FECHA DE NACIMIENTO", key: "date", width: 15 }),
      colour &&
      columns.push({
        header: "COLOR DE LA MASCOTA",
        key: "colour",
        width: 20,
      }),
      sterilized &&
      columns.push({ header: "ESTERELIZADO", key: "sterilized", width: 15 }),
      registeringEntity &&
      columns.push({
        header: "ENTIDAD REGISTRADORA",
        key: "registeringEntity",
        width: 15,
      }),
      registeringUser &&
      columns.push({
        header: "ENCARGADO DE LA ENTIDAD",
        key: "registeringUser",
        width: 15,
      }),
      // Añade las columnas a la hoja de trabajo
      (worksheet.columns = columns);

    // Agregar datos al reporte de los modelos

    // buscamos a la mascota por fecha de creacion
    const pets = await Pet.find();
    console.log(pets[0]);
    console.log("pets: ", pets.length);

    // buscamos al adopter por la address del usuario del pet
    const adopters = await Adopter.find({
      address: {
        $in: pets.map((pet) => pet.adopter),
      },
    });

    console.log("adopters: ", adopters.length);
    console.log(adopters[0]);

    // entidad registradora por la address del usuario del pet
    const users = await User.find({
      publicAddress: {
        $in: pets.map((pet) => pet.addressEr),
      },
    });

    console.log(users[0]);
    console.log(users.length);

    const petsWithAdopters = pets.map((pet) => {
      const adopter = adopters.find(
        (adopter) => adopter.address === pet.adopter
      );
      const user = users.find((user) => user.publicAddress === pet.addressEr);
      return {
        pet,
        adopter: adopter ? adopter : null,
        user,
      };
    });
    console.log("todos", petsWithAdopters.length);
    // console.log("todos", petsWithAdopters[0]);

    // filter pet by entity

    const petsWithEntityFiltered =
      entity === "" || entity.length === 0
        ? petsWithAdopters
        : petsWithAdopters.filter(
          (petWithAdopter) =>
            petWithAdopter.user &&
            petWithAdopter.user.user.name === entity.split("-")[0].trim() &&
            petWithAdopter.user.user.lastName === entity.split("-")[1].trim()
        );
    // petsWithAdopters.filter((petWithAdopter) => {
    //   petWithAdopter.user &&
    //     console.log(petWithAdopter.user.user.name === "CHRISTIAN");
    // });

    // console.log(entity.split("-")[0].trim(), entity.split("-")[1].trim());
    console.log("entity", petsWithEntityFiltered.length);

    // filter pet by typeAnimal

    const petsWithAnimalFiltered =
      typeAnimal === ""
        ? petsWithEntityFiltered
        : petsWithEntityFiltered.filter(
          (petWithAdopter) =>
            petWithAdopter.pet &&
            petWithAdopter.pet.type === typeAnimal.toUpperCase()
        );
    console.log("animal", petsWithAnimalFiltered.length);

    // filter pet by typeRace

    const petsWithRaceFiltered = petsWithAnimalFiltered;
    typeRace === ""
      ? petsWithAnimalFiltered
      : petsWithAnimalFiltered.filter(
        (petWithAdopter) =>
          petWithAdopter.pet &&
          petWithAdopter.pet.race === typeRace.toUpperCase()
      );
    console.log("raza", typeRace);
    console.log("raza", typeRace.length);
    console.log("raza", typeof typeRace);
    console.log("razas", petsWithRaceFiltered.length);

    // filter adopters by department

    const petsWithDepartmentFilter =
      department === ""
        ? petsWithRaceFiltered
        : petsWithRaceFiltered.filter(
          (petWithAdopter) =>
            petWithAdopter.adopter &&
            petWithAdopter.adopter.department === department
        );

    console.log("departamentos", petsWithDepartmentFilter.length);

    // filter adopters by province

    const petsWithProvinceFilter =
      province === ""
        ? petsWithDepartmentFilter
        : petsWithDepartmentFilter.filter(
          (petWithAdopter) =>
            petWithAdopter.adopter &&
            petWithAdopter.adopter.province === province
        );

    console.log("provincia", petsWithProvinceFilter.length);

    // filter adopters by district

    const petsWithAdoptersFiltered =
      district === ""
        ? petsWithProvinceFilter
        : petsWithProvinceFilter.filter(
          (petWithAdopter) =>
            petWithAdopter.adopter &&
            petWithAdopter.adopter.district === district
        );

    console.log("distrito", petsWithAdoptersFiltered.length);

    // filter adopters by date_start and date_end data.startDate, data.endDate

    const petsWithAdoptersFilteredByDate =
      data.startDate === "" || data.endDate === ""
        ? petsWithAdoptersFiltered
        : petsWithAdoptersFiltered.filter((petWithAdopter) => {
          const date = new Date(petWithAdopter.pet.created_at);
          return (
            date >= new Date(data.startDate) && date <= new Date(data.endDate)
          );
        });

    console.log("fecha", data.startDate);
    console.log("fecha", data.endDate);
    console.log("fecha", petsWithAdoptersFilteredByDate.length);

    // console.log(petsWithAdopters[0]);
    // console.log(petsWithAdoptersFiltered[0]);
    // console.log(petsWithAdoptersFiltered.length);

    // Agregar datos al reporte

    petsWithAdoptersFilteredByDate.forEach((petsWithAdopter) => {
      worksheet.addRow({
        created_at: created_at && petsWithAdopter.pet.created_at,
        name: name && petsWithAdopter.adopter?.name,
        surname: surname && petsWithAdopter.adopter?.lastName,
        country: country && petsWithAdopter.adopter?.country,
        department: country && petsWithAdopter.adopter?.department,
        province: country && petsWithAdopter.adopter?.province,
        district: country && petsWithAdopter.adopter?.district,
        email: email && petsWithAdopter.adopter?.email,
        phone: phone && petsWithAdopter.adopter?.phone,
        dni: dni && petsWithAdopter.adopter?.documentNumber,
        pet: pet && petsWithAdopter.pet.name,
        race: race && petsWithAdopter.pet.race,
        gender: gender && petsWithAdopter.pet.gender,
        chip: chip && petsWithAdopter.pet.chip,
        chip_date: chip_date && petsWithAdopter.pet.chipDate,
        type_pet: type_pet && petsWithAdopter.pet.type,
        date: date && petsWithAdopter.pet.created_at,
        colour: colour && petsWithAdopter.pet.colour,
        sterilized: sterilized && petsWithAdopter.pet.sterilized,
        registeringEntity:
          registeringEntity && petsWithAdopter.user?.user?.local,
        registeringUser: registeringUser && petsWithAdopter.user?.user?.name,
        // vaccines: petsWithAdopter.pet.vaccines.product,
      });
    });

    // Guardar el reporte en un archivo
    // await workbook.xlsx.writeFile('reporte.xlsx');

    // ... Generar el reporte en Excel ...

    // Almacenar el archivo Excel en memoria
    const buffer = await workbook.xlsx.writeBuffer();

    // console.log(buffer);

    // guardar el excel local
    // await workbook.xlsx.writeFile("reporte.xlsx");

    console.log("Reporte generado exitosamente.");
    return buffer;
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    res.status(500).send("Error al generar el reporte");
  }
};

module.exports = {
  generateExcelReport,
};
