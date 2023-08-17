const { response } = require("express");
const Color = require("../model/Color");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

const getColors = async (req, res = response) => {
	// get Colors from database mongo with moongose
	// with query params limit and offset
	try {
		// Obtener los parámetros de consulta limit y offset
		const { limit = 5, offset = 0, page = 1, type, search } = req.query;

		// const newOffset = (Number(page) - 1) * Number(limit);
		const newOffset = offset;

		const Colors = await Color.find()
			.skip(Number(newOffset))
			.limit(Number(limit))
			.sort({ name: 1 });

		const ColorsTotal = await Color.find();

		// Colors searched
		if (search) {
			const ColorsSearched = await Color.find({
				$or: [
					{ name: { $regex: search.toUpperCase(), $options: "i" } },
					{ nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
					{ nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
				],
			})
				.skip(Number(newOffset))
				.limit(Number(limit))
				.sort({ name: 1 });
			// console.log(search);
			// console.log(ColorsSearched);

			const ColorsSearchedTotal = await Color.find({
				$or: [
					{ name: { $regex: search.toUpperCase(), $options: "i" } },
					{ nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
					{ nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
				],
			});

			return res.status(200).json({
				ok: true,
				total: ColorsSearched.length,
				colors: ColorsSearched,
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

		return res.status(200).json({
			ok: true,
			total: ColorsTotal.length,
			colors: Colors,
			pagination: {
				limit: Number(limit),
				// offset: Number(offset),
				offset: Number(newOffset),
				currentPage: Math.ceil(offset / limit) + 1,
				prevPage: Math.ceil(offset / limit),
				nextPage: Math.ceil(offset / limit) + 2,
				// currentPage: Number(page),
				totalPages: Math.ceil(ColorsTotal.length / Number(limit)),
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

const getColor = async (req, res = response) => {
	const { id } = req.params;

	try {
		const color = await color.findById(id);

		res.json({
			ok: true,
			color,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener la raza",
		});
	}
};

const createColor = async (req, res = response) => {
	try {
		// Obtener los datos de la nueva raza desde el cuerpo de la solicitud
		const { name, nameSpanish, nameEnglish, hex } = req.body;

		// Crear una instancia del modelo Color con los datos proporcionados
		const newColor = new Color({
			name,
			nameSpanish,
			nameEnglish,
			hex,
		});

		// Guardar la nueva raza en la base de datos
		await newColor.save();

		res.json({
			ok: true,
			color: newColor,
			msg: "Raza creada exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al crear la raza",
		});
	}
};

const insertColors = async (req, res = response) => {
	try {
		// leer las razas en el json local en la carpeta data

		const fileData = fs.readFileSync("./data/color/Colors.json");
		const Colors = JSON.parse(fileData);
		// mapear las razas y insertarlas en la base de datos

		console.log(Colors);

		const insertColors = Colors.map((color) => {
			return {
				name: color.value,
				nameSpanish: color["es-Es"],
				nameEnglish: color["en-Us"],
				hex: color.hex,
			};
		});

		const registered = Colors.map(async (color) => {
			const newColor = new Color({
				name: color.value,
				nameSpanish: color["es-Es"],
				nameEnglish: color["en-Us"],
				hex: color.hex,
			});

			await newColor.save();

			return newColor;
		});

		// Guardar la nueva raza en la base de datos
		await registered;

		return res.status(200).json({
			ok: true,
			total: Colors.length,
			Colors: insertColors,
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

const updateColor = async (req, res) => {
	try {
		const { id } = req.params; // Obtener el ID de la raza a actualizar desde los parámetros de la URL
		const { name, nameSpanish, nameEnglish, hex } = req.body; // Obtener los nuevos datos de la raza desde el cuerpo de la solicitud

		// Buscar la raza por su ID y actualizar los campos correspondientes
		const updatedColor = await Color.findByIdAndUpdate(
			id,
			{
				name,
				nameSpanish,
				nameEnglish,
				hex,
			},
			{ new: true } // Devolver el documento actualizado
		);

		if (!updatedColor) {
			return res.status(404).json({
				ok: false,
				msg: "Raza no encontrada",
			});
		}

		res.json({
			ok: true,
			color: updatedColor,
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

const deleteColor = async (req, res) => {
	try {
		const { id } = req.params; // Obtener el ID de la raza a eliminar desde los parámetros de la URL

		// Buscar la raza por su ID y eliminarla
		const deletedColor = await Color.findByIdAndDelete(id);

		if (!deletedColor) {
			return res.status(404).json({
				ok: false,
				msg: "Color no encontrada",
			});
		}

		res.json({
			ok: true,
			msg: "Raza eliminada exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al eliminar la raza",
		});
	}
};

const deleteAllColor = async (req, res) => {
	try {
		// Buscar la raza por su ID y eliminarla
		// const deletedColor = await Color.deleteMany({});
		const deletedColor = await Color.collection.drop();

		// if (!deletedColor) {
		//   return res.status(404).json({
		//     ok: false,
		//     msg: "Raza no encontrada",
		//   });
		// }

		res.json({
			ok: true,
			msg: "Razas eliminadas exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al eliminar la raza",
		});
	}
};

module.exports = {
	getColors,
	getColor,
	createColor,
	insertColors,
	updateColor,
	deleteColor,
	deleteAllColor,
};
