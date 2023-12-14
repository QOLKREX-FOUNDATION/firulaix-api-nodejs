const { response } = require("express");
const CodePhone = require("../model/CodePhone");
const fs = require("fs");
const { uploadImage } = require("../helpers/uploadImage");

const getCodes = async (req, res = response) => {
  // get codes from database mongo with moongose
  // with query params limit and offset
  try {
    // Obtener los parámetros de consulta limit y offset
    const { limit = 5, offset = 0, page = 1, type, search } = req.query;

    // const newOffset = (Number(page) - 1) * Number(limit);
    const newOffset = offset;

    // Construir el objeto de consulta para buscar las razas
    const query = {};

    const codes = await CodePhone.find(query)
      .skip(Number(newOffset))
      .limit(Number(limit))
      .sort({ name: 1 });

    const CodeTotal = await CodePhone.find();

    // codes searched
    if (search) {
      const CodeSearched = await CodePhone.find({
        $or: [
          { name: { $regex: search.toUpperCase(), $options: "i" } },
          { nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
          { nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
        ],
      })
        .skip(Number(newOffset))
        .limit(Number(limit))
        .sort({ name: 1 });

      const ColorsSearchedTotal = await CodePhone.find({
        $or: [
          { name: { $regex: search.toUpperCase(), $options: "i" } },
          { nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
          { nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
        ],
      });

      // console.log({ CodeSearched });

      return res.status(200).json({
        ok: true,
        total: CodeSearched.length,
        codes: CodeSearched,
        pagination: {
          limit: Number(limit),
          // offset: Number(offset),
          offset: Number(newOffset),
          currentPage: Math.ceil(offset / limit) + 1,
          prevPage: Math.ceil(offset / limit),
          nextPage: Math.ceil(offset / limit) + 2,
          // currentPage: Number(page),
          totalPages: Math.ceil(ColorsSearchedTotal.length / Number(limit)),
        },
      });
    }

    // console.log({ codes });

    return res.status(200).json({
      ok: true,
      total: CodeTotal.length,
      codes: codes,
      pagination: {
        limit: Number(limit),
        // offset: Number(offset),
        offset: Number(newOffset),
        currentPage: Math.ceil(offset / limit) + 1,
        prevPage: Math.ceil(offset / limit),
        nextPage: Math.ceil(offset / limit) + 2,
        // currentPage: Number(page),
        totalPages: Math.ceil(CodeTotal.length / Number(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las razas",
    });
  }
};

const getCode = async (req, res = response) => {
  const { id } = req.params;

  try {
    const code = await CodePhone.findById(id);

    console.log({ code });

    return res.status(200).json({
      ok: true,
      code,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la raza",
    });
  }
};

const createCode = async (req, res = response) => {
  try {
    // Obtener los datos de la nueva raza desde el cuerpo de la solicitud
    const { name, countryCode, phoneCode, nationality } = req.body;

    const files = req.files?.image;

    console.log({ files });

    const imageData =
      req.files !== null
        ? await uploadImage(files, "code-phone")
        : {
          cloduinaryId: "",
          imageUrl: "",
        };

    // Crear una instancia del modelo Code con los datos proporcionados
    const newCodePhone = new CodePhone({
      name: name.toUpperCase(),
      countryCode,
      phoneCode,
      image: {
        cloduinaryId: imageData?.cloduinaryId,
        imageUrl: imageData?.imageUrl,
      },
      nationality: nationality.toUpperCase(),
    });

    // Guardar la nueva raza en la base de datos
    await newCodePhone.save();

    res.json({
      ok: true,
      Code: newCodePhone,
      msg: "Code Phone creada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear la raza",
    });
  }
};

const insertCode = async (req, res = response) => {
  try {
    // leer las razas en el json local en la carpeta data

    const fileData = fs.readFileSync("./data/Code/codes.json");
    const codes = JSON.parse(fileData);
    // mapear las razas y insertarlas en la base de datos

    console.log(codes);

    const insertCodes = codes.map((Code) => {
      return {
        name: Code.value,
        nameSpanish: Code["es-Es"],
        nameEnglish: Code["en-Us"],
        hex: Code.hex,
      };
    });

    const registered = codes.map(async (Code) => {
      const newCode = new Code({
        name: Code.value,
        nameSpanish: Code["es-Es"],
        nameEnglish: Code["en-Us"],
        hex: Code.hex,
      });

      await newCode.save();

      return newCode;
    });

    // Guardar la nueva raza en la base de datos
    await registered;

    return res.status(200).json({
      ok: true,
      total: codes.length,
      codes: insertCodes,
      msg: "Colores insertadas exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al insertar los colores",
    });
  }
};

const updateCode = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la raza a actualizar desde los parámetros de la URL
    const { name, countryCode, phoneCode } = req.body; // Obtener los nuevos datos de la raza desde el cuerpo de la solicitud

    const files = req.files?.image;

    console.log({ files });

    const findCode = await CodePhone.findById(id);

    const imageData =
      req.files !== null
        ? await uploadImage(files, "code-phone")
        : {
          cloduinaryId: findCode.image.cloduinaryId,
          imageUrl: findCode.image.imageUrl,
        };

    // Buscar la raza por su ID y actualizar los campos correspondientes
    const updatedCode = await CodePhone.findByIdAndUpdate(
      id,
      {
        name: name.toUpperCase(),
        countryCode,
        phoneCode,
        image: {
          cloduinaryId: imageData?.cloduinaryId,
          imageUrl: imageData?.imageUrl,
        },
      },
      { new: true } // Devolver el documento actualizado
    );

    if (!updatedCode) {
      return res.status(404).json({
        ok: false,
        msg: "Raza no encontrada",
      });
    }

    res.json({
      ok: true,
      Code: updatedCode,
      msg: "Raza actualizada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar la raza",
    });
  }
};

const deleteCode = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la raza a eliminar desde los parámetros de la URL

    // Buscar la raza por su ID y eliminarla
    const deletedCode = await CodePhone.findByIdAndDelete(id);

    if (!deletedCode) {
      return res.status(404).json({
        ok: false,
        msg: "Code no encontrada",
      });
    }

    res.json({
      ok: true,
      msg: "Code eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el code",
    });
  }
};

module.exports = {
  getCodes,
  getCode,
  createCode,
  insertCode,
  updateCode,
  deleteCode,
};
