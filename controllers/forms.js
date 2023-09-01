const { request, response } = require("express");
// const { generatePdf } = require("../helpers/generatePdf");
// const { createCanvasQr } = require("../helpers/generateQrCanvas");
const Request = require("../model/Request");
const {
  createFormSchema,
  updateFormSchema,
} = require("../schemas/form.schema");
// const fs = require("fs");
const qrCode = require("qrcode");
const {
  templateRequestRegisterForm,
} = require("../mail/templateRequestRegister");
const { generateSequence } = require("../helpers/generateSquence");

const createQr = async (req, res = response) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "The url is required" });
  }

  try {
    const code = await qrCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#0096ff",
        light: "#ffffff",
      },
    });
    // const qrCodeWithImage = await createCanvasQr(
    //   url,
    //   fs.readFileSync("./public/image/logo-icon.png")
    // );

    res.json({
      ok: true,
      // code: qrCodeWithImage,
      code: code,
      msg: "Qr created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error creating qr",
    });
  }
};

const getForms = async (req, res = response) => {
  const { uid } = req;

  console.log("uid", uid);

  try {
    const userById = await User.findById(uid);
    console.log("userById", userById);
    // const user = await User.find();
    // console.log("user", user);

    // const { limit = 10, offset = 0, page = 1, type, search } = req.query;
    // const newOffset = offset;
    // const query = { status: true };

    // const Forms = await Request.find()
    //   .skip(Number(newOffset))
    //   .limit(Number(limit))
    //   .sort({
    //     createdAt: -1,
    //   });

    // const FormsTotal = await Request.find();

    // if (search) {
    //   const FormSearched = await Request.find({
    //     $or: [
    //       {
    //         "adopter.firstName": {
    //           $regex: search.toUpperCase(),
    //           $options: "i",
    //         },
    //       },
    //       { "adopter.dni": { $regex: search.toUpperCase(), $options: "i" } },
    //       { "adopter.email": { $regex: search.toUpperCase(), $options: "i" } },
    //     ],
    //   })
    //     .skip(Number(newOffset))
    //     .limit(Number(limit))
    //     .sort({ name: 1 });

    //   const FormsSearchedTotal = await Request.find({
    //     $or: [
    //       { name: { $regex: search.toUpperCase(), $options: "i" } },
    //       { nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
    //       { nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
    //     ],
    //   });

    //   return res.status(200).json({
    //     ok: true,
    //     total: FormSearched.length,
    //     colors: FormSearched,
    //     pagination: {
    //       limit: Number(limit),
    //       // offset: Number(offset),
    //       offset: Number(newOffset),
    //       currentPage: Math.ceil(offset / limit) + 1,
    //       prevPage: Math.ceil(offset / limit),
    //       nextPage: Math.ceil(offset / limit) + 2,
    //       // currentPage: Number(page),
    //       totalPages: Math.ceil(FormsSearchedTotal.length / Number(limit)),
    //     },
    //   });
    // }

    // return res.status(200).json({
    //   ok: true,
    //   total: FormsTotal.length,
    //   forms: Forms,
    //   pagination: {
    //     limit: Number(limit),
    //     offset: Number(newOffset),
    //     currentPage: Math.ceil(offset / limit) + 1,
    //     prevPage: Math.ceil(offset / limit),
    //     nextPage: Math.ceil(offset / limit) + 2,
    //     totalPages: Math.ceil(FormsTotal.length / Number(limit)),
    //   },
    // });

    // son todos los formularios de registro

    // total forms
    const forms = await Request.find();

    // filtramos los formularios por entidad
    // const entities = forms.map(async (form) => {
    //   const entity = await User.findById(form.adopter.regiterEntity);
    //   console.log("entity", entity);
    //   return form.adopter.regiterEntity;
    // });

    // forms by entity
    const formsByUid = forms.filter((form) => {
      return form.adopter.regiterEntity === uid;
    });

    console.log("formsByUid", formsByUid);

    if (userById.user.position === "DEV") {
      return res.status(200).json({
        ok: true,
        total: forms.length,
        forms,
      });
    }

    return res.status(200).json({
      ok: true,
      total: formsByUid.length,
      forms: formsByUid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const createForm = async (req, res = response) => {
  const {
    country,
    person,
    documentType,
    documentNumber,
    adopterType,
    isAddressPublic,
    addressPublic,
    // dni,
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    birthDate,
    gender,
    cellphone,
    email,
    department,
    province,
    district,
    address,
    regiterEntity,
    jurament1,
    jurament2,
    jurament3,
    microchip,
    dateMicrochip,
    firstNamePet,
    countryPet,
    birthDatePet,
    adoptionDate,
    genderPet,
    specie,
    race,
    color,
    isSterilized,
    fatherMicrochip,
    motherMicrochip,
    isPayment,
  } = req.body;

  console.log("body", req.body);

  const { error, value } = createFormSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      error: error.details[0].message,
    });
  }

  console.log("value", value);

  try {
    const newCorrelativeNumber = await generateSequence(
      "Request",
      "correlativeNumber"
    );

    const newForm = new Request({
      adopter: {
        country,
        person,
        documentType,
        documentNumber,
        adopterType,
        isAddressPublic,
        addressPublic,
        // dni,
        firstName: firstName.toUpperCase(),
        secondName: secondName.toUpperCase(),
        firstLastName: firstLastName.toUpperCase(),
        secondLastName: secondLastName.toUpperCase(),
        birthDate,
        gender,
        cellphone,
        email,
        department,
        province,
        district,
        address: address.toUpperCase(),
        regiterEntity,
        jurament1,
        jurament2,
        jurament3,
      },
      pet: {
        microchip,
        dateMicrochip,
        firstNamePet: firstNamePet.toUpperCase(),
        countryPet,
        birthDatePet,
        adoptionDate,
        genderPet,
        specie,
        race,
        color,
        isSterilized,
        // dni,
        fatherMicrochip,
        motherMicrochip,
      },
      correlativeNumber: newCorrelativeNumber,
      isPayment,
    });

    await newForm.save();

    res.json({
      ok: true,
      form: {
        ...req.body,
      },
      msg: "Form created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error creating form",
    });
  }
};

// const createPdfForm = async (req = request, res = response) => {
//   const { id } = req.params;
//   console.log(id);
//   // console.log("query", req.params.id);
//   try {
//     if (!id) {
//       console.log("formData", id);
//       return res.status(400).json({
//         ok: false,
//         msg: "The id is required",
//       });
//     }

//     const formData = await Request.findById(id);

//     if (!formData) {
//       return res.status(400).json({
//         ok: false,
//         msg: "The form does not exist",
//       });
//     }

//     const pdfBuffer = await generatePdf(
//       templateRequestRegisterForm({
//         data: formData,
//       }),
//       {}
//     );

//     res.status(200).setHeader("Content-Type", "application/pdf");
//     res
//       .status(200)
//       .setHeader("Content-Disposition", `attachment; filename=generated.pdf`);
//     res.status(200).send(pdfBuffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Error creating form",
//     });
//   }
// };

const updateForm = async (req, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "The id is required" });
  }

  const { error, value } = updateFormSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      error: error.details[0].message,
    });
  }

  const {
    country,
    person,
    documentType,
    documentNumber,
    adopterType,
    isAddressPublic,
    addressPublic,
    // dni,
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    birthDate,
    gender,
    cellphone,
    email,
    department,
    province,
    district,
    address,
    regiterEntity,
    jurament1,
    jurament2,
    jurament3,
    microchip,
    dateMicrochip,
    firstNamePet,
    countryPet,
    birthDatePet,
    adoptionDate,
    genderPet,
    specie,
    race,
    color,
    isSterilized,
    fatherMicrochip,
    motherMicrochip,
    isPayment
  } = req.body;

  console.log("value", value);

  try {
    const updatedForm = await Request.findByIdAndUpdate(id, {
      adopter: {
        country,
        person,
        documentType,
        documentNumber,
        adopterType,
        isAddressPublic,
        addressPublic,
        // dni,
        firstName: firstName.toUpperCase(),
        secondName: secondName.toUpperCase(),
        firstLastName: firstLastName.toUpperCase(),
        secondLastName: secondLastName.toUpperCase(),
        birthDate,
        gender,
        cellphone,
        email,
        department,
        province,
        district,
        address: address.toUpperCase(),
        regiterEntity,
        jurament1,
        jurament2,
        jurament3,
      },
      pet: {
        microchip,
        dateMicrochip,
        firstNamePet: firstNamePet.toUpperCase(),
        countryPet,
        birthDatePet,
        adoptionDate,
        genderPet,
        specie,
        race,
        color,
        isSterilized,
        fatherMicrochip,
        motherMicrochip,
      },
      isPayment,
    });

    res.status(200).json({
      ok: true,
      msg: "Form updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error updating form",
    });
  }
};

const deleteForm = async (req, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "The id is required" });
  }

  try {
    await Request.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Form deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error deleting form",
    });
  }
};

module.exports = {
  createQr,
  getForms,
  createForm,
  updateForm,
  deleteForm,
};
