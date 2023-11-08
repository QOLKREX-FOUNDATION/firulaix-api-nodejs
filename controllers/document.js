const { response } = require("express");
const DocumentIdentity = require("../model/Document");
const fs = require("fs");

const getDocuments = async (req, res = response) => {
  // get Documents from database mongo with moongose
  // with query params limit and offset
  try {
    // Obtener los parámetros de consulta limit y offset
    const { limit = 5, offset = 0, page = 1, type, search } = req.query;

    // const newOffset = (Number(page) - 1) * Number(limit);
    const newOffset = offset;

    // Construir el objeto de consulta para buscar las razas
    const query = {};

    const Documents = await DocumentIdentity.find(query)
      .skip(Number(newOffset))
      .limit(Number(limit))
      .sort({
        name: 1,
        createdAt: -1,
      })
      .populate("countries", "name");

    const DocumentsTotal = await DocumentIdentity.find();

    // Documents searched
    if (search) {
      const DocumentsSearched = await DocumentIdentity.find({
        $or: [
          { name: { $regex: search.toUpperCase(), $options: "i" } },
          { nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
          { nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
        ],
      })
        .skip(Number(newOffset))
        .limit(Number(limit))
        .sort({ name: 1, createdAt: -1 })
        .populate("countries", "name");
      // console.log(search);
      // console.log(DocumentsSearched);

      const DocumentsSearchedTotal = await DocumentIdentity.find({
        $or: [
          { name: { $regex: search.toUpperCase(), $options: "i" } },
          { nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
          { nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
        ],
      }).sort({ name: 1, createdAt: -1 });

      return res.status(200).json({
        ok: true,
        total: DocumentsSearched.length,
        documents: DocumentsSearched,
        pagination: {
          limit: Number(limit),
          // offset: Number(offset),
          offset: Number(newOffset),
          currentPage: Math.ceil(offset / limit) + 1,
          prevPage: Math.ceil(offset / limit),
          nextPage: Math.ceil(offset / limit) + 2,
          // currentPage: Number(page),
          totalPages: Math.ceil(DocumentsSearchedTotal.length / Number(limit)),
        },
      });
    }

    console.log({ Documents });

    return res.status(200).json({
      ok: true,
      total: DocumentsTotal.length,
      documents: Documents,
      pagination: {
        limit: Number(limit),
        // offset: Number(offset),
        offset: Number(newOffset),
        currentPage: Math.ceil(offset / limit) + 1,
        prevPage: Math.ceil(offset / limit),
        nextPage: Math.ceil(offset / limit) + 2,
        // currentPage: Number(page),
        totalPages: Math.ceil(DocumentsTotal.length / Number(limit)),
      },
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener los animales",
    });
  }
};

const getDocument = async (req, res = response) => {
  const { id } = req.params;

  try {
    const DocumentIdentity = await DocumentIdentity.findById(id);

    res.json({
      ok: true,
      DocumentIdentity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener la animal",
    });
  }
};

const createDocument = async (req, res = response) => {
  try {
    // Obtener los datos de la nueva raza desde el cuerpo de la solicitud
    const { name, minDigits, maxDigits, countries } = req.body;

    console.log({
      name: name.toUpperCase(),
      minDigits,
      maxDigits,
      countries,
    });

    const countryIds = countries.split(",");

    // Crear una instancia del modelo DocumentIdentity con los datos proporcionados
    const newDocument = new DocumentIdentity({
      name,
      minDigits,
      maxDigits,
      countries: countryIds,
    });

    // Guardar la nueva raza en la base de datos
    await newDocument.save();

    return res.status(200).json({
      ok: true,
      animal: newDocument,
      msg: "DocumentIdentity creada exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al crear la animal",
    });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la raza a actualizar desde los parámetros de la URL
    const { name, minDigits, maxDigits, countries } = req.body; // Obtener los nuevos datos de la raza desde el cuerpo de la solicitud

    const countryIds = countries.split(",");

    // Buscar la raza por su ID y actualizar los campos correspondientes
    const updatedAnimal = await DocumentIdentity.findByIdAndUpdate(
      id,
      {
        name: name.toUpperCase(),
        minDigits,
        maxDigits,
        countries: countryIds,
      },
      { new: true } // Devolver el documento actualizado
    );

    if (!updatedAnimal) {
      return res.status(404).json({
        ok: false,
        msg: "Raza no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      animal: updatedAnimal,
      msg: "Raza actualizada exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar la animal",
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la raza a eliminar desde los parámetros de la URL

    // Buscar la raza por su ID y eliminarla
    const deletedDocument = await DocumentIdentity.findByIdAndDelete(id);

    if (!deletedDocument) {
      return res.status(404).json({
        ok: false,
        msg: "DocumentIdentity no encontrada",
      });
    }

    res.json({
      ok: true,
      msg: "DocumentIdentity eliminada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar la animal",
    });
  }
};

const deleteAllDocument = async (req, res) => {
  try {
    // Buscar la raza por su ID y eliminarla
    // const deletedAnimal = await DocumentIdentity.deleteMany({});
    const deletedAnimal = await DocumentIdentity.collection.drop();

    // if (!deletedAnimal) {
    //   return res.status(404).json({
    //     ok: false,
    //     msg: "Raza no encontrada",
    //   });
    // }

    res.json({
      ok: true,
      msg: "DocumentIdentity eliminadas exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar la animal",
    });
  }
};

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  deleteAllDocument,
};
