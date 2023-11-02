const { request: requestExpress, response } = require("express");
const Request = require("../model/Request");
const {
  createFormSchema,
  updateFormSchema,
} = require("../schemas/form.schema");
const { generateSequence } = require("../helpers/generateSquence");
const User = require("../model/User");
const qrCode = require("qrcode");
const jwt = require("jsonwebtoken");
const { uploadImage, destroyImage } = require("../helpers/uploadImage");
const { mailRegisterUser } = require("../helpers/mail");

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

  const { adopter, pet, chip, correlative } = req.query;

  try {
    const userById = await User.findById(uid);
    console.log("userById", userById);

    let query = {};

    if (adopter) {
      query["adopter.firstName"] = { $regex: adopter, $options: "i" };
    }

    if (pet) {
      query["pet.firstNamePet"] = { $regex: pet, $options: "i" };
    }

    if (chip) {
      query["pet.microchip"] = { $regex: chip, $options: "i" };
    }

    if (correlative) {
      query["correlativeNumber"] = { $regex: correlative, $options: "i" };
    }

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
    const forms = await Request.find(query)
      .sort({
        createdAt: -1,
      }).limit(100);

    // filtramos los formularios por entidad
    // const entities = forms.map(async (form) => {
    //   const entity = await User.findById(form.adopter.registerEntity);
    //   console.log("entity", entity);
    //   return form.adopter.registerEntity;
    // });

    // forms by entity
    const formsByUid = forms.filter((form) => {
      // console.log("form.adopter.registerEntity", form.adopter.registerEntity);
      // console.log({ uid });
      return form.adopter.registerEntity === uid;
    });

    if (!userById) {
      return res.status(400).json({
        ok: false,
        msg: "The user does not exist",
      });
    }

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

const getFormsById = async (req, res = response) => {
  const { id } = req.params;

  console.log("id", id);

  try {
    if (!id) {
      return res.status(400).json({
        ok: false,
        msg: "The id is required",
      });
    }

    // total forms
    const form = await Request.findById(id);

    // si no encuentra el formulario

    if (!form) {
      return res.status(200).json({
        ok: false,
        msg: "The form does not exist",
      });
    }

    // console.log("form", form);
    return res.status(200).json({
      ok: true,
      total: form.length,
      form,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

// busca el correlativo por jwt
const getFormsByCorrelative = async (req, res = response) => {
  const { correlative: correlativeToken } = req.params;

  console.log("correlativeToken", correlativeToken);

  try {
    const { correlative } = jwt.verify(
      correlativeToken,
      process.env.SECRET_JWT_SEED
    );

    if (!correlative) {
      return res.status(400).json({
        ok: false,
        msg: "The correlative is required",
      });
    }

    // total forms
    const form = await Request.find({
      correlativeNumber: correlative,
    });

    console.log("form", form);
    return res.status(200).json({
      ok: true,
      total: form.length,
      form,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const getFormsByAdress = async (req, res = response) => {
  const { address } = req.params;

  console.log("address", address);

  try {
    if (!address) {
      return res.status(400).json({
        ok: false,
        msg: "The correlative is required",
      });
    }

    // total forms
    // const firstTenUsers = await User.find().limit(10);

    // console.log("firstTenUsers", firstTenUsers);

    // const allUser = await User.find();

    // console.log(allUser);

    const userData = await User.find({
      // $nor: [
      //   { publicAddress: { $regex: address.toUpperCase(), $options: "i" } },
      // ],
      publicAddress: address.toUpperCase(),
    });

    // si no encuentra el formulario

    if (userData.length === 0) {
      return res.status(200).json({
        ok: false,
        msg: "The user does not exist",
        form: {
          department: "",
          province: "",
          district: "",
          registerEntity: "",
        },
      });
    }

    console.log("user", userData);
    return res.status(200).json({
      ok: true,
      total: userData.length,
      form: {
        department: userData[0].user?.department?.trim() || "",
        province: userData[0].user?.province?.trim() || "",
        district: userData[0].user?.district?.trim() || "",
        registerEntity: userData[0]._id || "",
        name: userData[0].user?.name?.trim() || "",
        lastName: userData[0].user?.lastName?.trim() || "",
        local: userData[0].user?.local?.trim() || "",
      },
    });
    // return res.status(200).json({
    //   ok: true,
    //   total: userData.length,
    //   allUser: allUser
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

// busca el correlativo por request params
const getFormsByCorrelativeNumber = async (req, res = response) => {
  const { correlative } = req.params;
  console.log("correlative", correlative);
  try {
    if (!correlative) {
      return res.status(400).json({
        ok: false,
        msg: "The correlative is required",
      });
    }

    // total forms
    const form = await Request.find({
      correlativeNumber: correlative,
    });

    // si no encuentra el formulario
    if (form.length === 0) {
      return res.status(200).json({
        ok: false,
        msg: "The form does not exist",
        // msg: "No se encontró el formulario",
      });
    }

    // comparamos el dni del formulario con el dni del usuario, enviar mensaje que el usuario ya existe
    // const user = await User.findOne({
    //   documentNumber: form[0].adopter.documentNumber,
    // });

    // console.log({ user });

    // if (user) {
    //   return res.status(200).json({
    //     ok: false,
    //     // msg: "The user already exists",
    //     msg: "El usuario ya existe",
    //   });
    // }

    // console.log("form", form);
    return res.status(200).json({
      ok: true,
      total: form.length,
      form,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const createForm = async (req = requestExpress, res = response) => {
  const {
    country,
    person,
    documentType,
    documentNumber,
    nationality,
    phoneCode,
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
    registerEntity,
    jurament1,
    isMicrochip,
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
    // isPayment,
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

    const files = req.files?.files;

    console.log("files", files);

    // si la imagen existe, la borramos y subimos la nueva imagen

    const imageData =
      req.files !== null
        ? await uploadImage(files, "form-register")
        : {
          cloduinaryId: "",
          imageUrl: "",
        };

    const newForm = new Request({
      adopter: {
        country,
        person,
        documentType,
        documentNumber,
        nationality,
        phoneCode,
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
        registerEntity,
        jurament1,
        isMicrochip,
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
      isPayment: false,
      status: "complete",
      imagePet: {
        cloduinaryId: imageData?.cloduinaryId,
        imageUrl: imageData?.imageUrl,
      },
    });

    await newForm.save();

    const entityRegister = await User.find({
      _id: registerEntity,
    });

    await mailRegisterUser({
      registry: newForm,
      entityRegister,
    });

    res.status(200).json({
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

// actualiza el formulario en el dashboard
const updateForm = async (req = requestExpress, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ ok: false, error: "The id is required" });
  }

  const { error, value } = updateFormSchema.validate(req.body[0]);

  // console.log("req", req);
  // console.log("value", value);

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
    nationality,
    phoneCode,
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
    registerEntity,
    jurament1,
    isMicrochip,
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
    files
    // imagePet,
  } = req.body;

  // const uploadedFiles = req.files;

  console.log("req.body", req.body);

  console.log("req.files", req.files);
  // console.log("req.file", req.file);

  const reqFiles = req.files?.files;
  // console.log("imagePet", imagePet);

  // console.log("value", value);

  let imageData = {
    cloduinaryId: "",
    imageUrl: "",
  };


  // si la imagen existe, la borramos y subimos la nueva imagen

  const findImage = await Request.findById(id);

  console.log("findImage", findImage);

  // si el files que viene en el body es una url, no se sube la imagen y no se borra la imagen anterior
  console.log({ files });
  if (files === undefined) {
    // borrando la imagen
    if (findImage.imagePet) {
      // find cloduinaryId in cloudinary and delete
      // await cloudinary.uploader.destroy(
      //   `images/form-register/${findImage.imagePet.cloduinaryId}`
      // );
      console.log("id image", findImage.imagePet?.cloduinaryId);
      if (findImage.imagePet?.cloduinaryId) {
        await destroyImage(findImage.imagePet.cloduinaryId, "form-register");
      }
    }

    // subiendo la imagen
    imageData =
      req.files !== undefined
        ? await uploadImage(reqFiles, "form-register")
        : {
          cloduinaryId: "",
          imageUrl: "",
        };

  }
  // console.log({ imageData });

  if (files !== undefined) {
    imageData = {
      cloduinaryId: findImage.imagePet?.cloduinaryId || imageData.cloduinaryId,
      imageUrl: findImage.imagePet?.imageUrl || imageData.imageUrl,
    };
  }

  try {
    const updatedForm = await Request.findByIdAndUpdate(id, {
      adopter: {
        country,
        person,
        documentType,
        documentNumber,
        nationality,
        phoneCode,
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
        registerEntity,
        jurament1,
        isMicrochip,
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
      imagePet: {
        cloduinaryId: imageData?.cloduinaryId,
        imageUrl: imageData?.imageUrl,
      },
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

// actualiza el formulario cuando rellena el formulario de registro por correltivo
const updateFormWithCorrelative = async (req, res = response) => {
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
    nationality,
    phoneCode,
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
    registerEntity,
    jurament1,
    isMicrochip,
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
    status,
  } = req.body;

  console.log("value", value);

  try {
    const files = req.files?.files;

    const imageData =
      req.files !== null
        ? await uploadImage(files, "form-register")
        : {
          cloduinaryId: "",
          imageUrl: "",
        };

    const updatedForm = await Request.findByIdAndUpdate(id, {
      adopter: {
        country,
        person,
        documentType,
        documentNumber,
        nationality,
        phoneCode,
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
        registerEntity,
        jurament1,
        isMicrochip,
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
      status,
      imagePet: {
        cloduinaryId: imageData?.cloduinaryId,
        imageUrl: imageData?.imageUrl,
      },
    });

    const entityRegister = await User.find({
      _id: registerEntity,
    });

    await mailRegisterUser({
      registry: newForm,
      entityRegister,
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

const updateStatusForm = async (req = request, res = response) => {
  const { id } = req.params;
  const { status } = req.body; //status = pending, complete, rejected, registered , registered-pet, registered-adopter

  console.log({ id, status });

  // pending -> cuando el usuario llena el formulario
  // complete -> cuando el usuario completa el formulario
  // rejected -> cuando el usuario es rechazado
  // registered -> cuando el usuario es registrado
  // primero se registra el adoptante y luego la mascota
  // registered-adopter -> cuando el usuario es registrado y se registra el adoptante
  // registered-pet -> cuando el usuario es registrado y se registra la mascota

  const statusValid = [
    "pending",
    "completed",
    "rejected",
    "registered",
    "registered-pet",
    "registered-adopter",
  ];

  if (!id) {
    return res.status(400).json({ error: "The id is required" });
  }

  if (!status) {
    return res.status(400).json({ error: "The status is required" });
  }

  if (!statusValid.includes(status)) {
    return res.status(400).json({ error: "The status is invalid" });
  }

  try {
    const requestUpdated = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Form updated successfully",
      form: {
        ...requestUpdated._doc,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error updating form",
    });
  }
};

module.exports = {
  createQr,
  getForms,
  getFormsById,
  getFormsByCorrelative,
  getFormsByAdress,
  createForm,
  updateForm,
  updateFormWithCorrelative,
  getFormsByCorrelativeNumber,
  deleteForm,
  updateStatusForm,
};
