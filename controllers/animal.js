const { response } = require("express");
const Animal = require("../model/Animal");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

const getAnimals = async (req, res = response) => {
	// get Animals from database mongo with moongose
	// with query params limit and offset
	try {
		// Obtener los parámetros de consulta limit y offset
		const { limit = 5, offset = 0, page = 1, type, search } = req.query;

		// const newOffset = (Number(page) - 1) * Number(limit);
		const newOffset = offset;

		// Construir el objeto de consulta para buscar las animales

		const Animals = await Animal.find()
			.skip(Number(newOffset))
			.limit(Number(limit))
			.sort({ name: 1 });

		// console.log({ Animals });

		const AnimalsTotal = await Animal.find();

		console.log({ AnimalsTotal });

		// Animals searched
		if (search) {
			const AnimalsSearched = await Animal.find({
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
			// console.log(AnimalsSearched);

			const AnimalsSearchedTotal = await Animal.find({
				$or: [
					{ name: { $regex: search.toUpperCase(), $options: "i" } },
					{ nameSpanish: { $regex: search.toUpperCase(), $options: "i" } },
					{ nameEnglish: { $regex: search.toUpperCase(), $options: "i" } },
				],
			});

			return res.status(200).json({
				ok: true,
				total: AnimalsSearched.length,
				animals: AnimalsSearched,
				pagination: {
					limit: Number(limit),
					// offset: Number(offset),
					offset: Number(newOffset),
					currentPage: Math.ceil(offset / limit) + 1,
					prevPage: Math.ceil(offset / limit),
					nextPage: Math.ceil(offset / limit) + 2,
					// currentPage: Number(page),
					totalPages: Math.ceil(AnimalsSearchedTotal.length / Number(limit)),
				},
			});
		}

		// Animals filtered by type
		// if (type) {
		//   const AnimalsFiltered = await Animal.find({ animal: type })
		//     .skip(Number(newOffset))
		//     .limit(Number(limit))
		//     .sort({ name: 1 });

		//   const AnimalsFilteredTotal = await Animal.find({ animal: type });
		//   return res.status(200).json({
		//     ok: true,
		//     total: AnimalsFiltered.length,
		//     animals: AnimalsFiltered,
		//     pagination: {
		//       limit: Number(limit),
		//       // offset: Number(offset),
		//       offset: Number(newOffset),
		//       currentPage: Math.ceil(offset / limit) + 1,
		//       prevPage: Math.ceil(offset / limit),
		//       nextPage: Math.ceil(offset / limit) + 2,
		//       // currentPage: Number(page),
		//       totalPages: Math.ceil(AnimalsFilteredTotal.length / Number(limit)),
		//     },
		//   });
		// }

		return res.status(200).json({
			ok: true,
			total: AnimalsTotal.length,
			animals: Animals,
			pagination: {
				limit: Number(limit),
				// offset: Number(offset),
				offset: Number(newOffset),
				currentPage: Math.ceil(offset / limit) + 1,
				prevPage: Math.ceil(offset / limit),
				nextPage: Math.ceil(offset / limit) + 2,
				// currentPage: Number(page),
				totalPages: Math.ceil(AnimalsTotal.length / Number(limit)),
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener los animales",
		});
	}
};

const getAnimalsByType = async (req, res = response) => {
	try {
		// Obtener los parámetros de consulta limit y offset
		const { limit = 5, offset = 0, page = 1, type } = req.query;

		const Animals = await Animal.find({ animal: type.toUpperCase() });

		if (Animals.length === 0) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontraron animales",
			});
		}

		return res.status(200).json({
			ok: true,
			total: Animals.length,
			Animals,
			// pagination: {
			// limit: Number(limit),
			// offset: Number(offset),
			// offset: Number(newOffset),
			// currentPage: Math.ceil(offset / limit) + 1,
			// prevPage: Math.ceil(offset / limit),
			// nextPage: Math.ceil(offset / limit) + 2,
			// currentPage: Number(page),
			// totalPages: Math.ceil(AnimalsTotal.length / Number(limit)),
			// },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener las animales",
		});
	}
};

const getAnimalsByTypeSearch = async (req, res = response) => {
	try {
		// Obtener los parámetros de consulta limit y offset
		const { type, search } = req.query;

		// DECODE URI
		const searchUri = decodeURI(req.query.search);
		console.log(searchUri);

		if (!type || !search) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontraron animales",
				Animal: [],
			});
		}

		const Animals = await Animal.find({
			animal: type.toUpperCase(),
			name: { $regex: searchUri.toUpperCase(), $options: "i" },
		});

		if (Animals.length === 0) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontraron animales",
			});
		}

		return res.status(200).json({
			ok: true,
			total: Animals.length,
			Animal: Animals[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener las animales",
		});
	}
};

const getAnimal = async (req, res = response) => {
	const { id } = req.params;

	try {
		const Animal = await Animal.findById(id);

		res.json({
			ok: true,
			Animal,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener la animal",
		});
	}
};

const createAnimal = async (req, res = response) => {
	try {
		// Obtener los datos de la nueva animal desde el cuerpo de la solicitud
		const { name, nameSpanish, nameEnglish } = req.body;

		// Crear una instancia del modelo Animal con los datos proporcionados
		const newAnimal = new Animal({
			name,
			nameSpanish,
			nameEnglish,
		});

		// Guardar la nueva animal en la base de datos
		await newAnimal.save();

		res.json({
			ok: true,
			animal: newAnimal,
			msg: "animal creada exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al crear la animal",
		});
	}
};

const insertAnimals = async (req, res = response) => {
	try {
		// leer las animales en el json local en la carpeta data

		const fileData = fs.readFileSync("./data/animal/Animal.json");
		const Animals = JSON.parse(fileData);
		// mapear las animales y insertarlas en la base de datos

		console.log(Animals);

		const insertAnimals = Animals.map((animal) => {
			return {
				name: animal.value,
				nameSpanish: animal["es-Es"],
				nameEnglish: animal["en-Us"],
			};
		});

		const registered = Animals.map(async (animal) => {
			const newAnimal = new Animal({
				name: animal.value,
				nameSpanish: animal["es-Es"],
				nameEnglish: animal["en-Us"],
			});

			await newAnimal.save();

			return newAnimal;
		});

		// Guardar la nueva animal en la base de datos
		await registered;

		return res.status(200).json({
			ok: true,
			total: Animals.length,
			Animals: insertAnimals,
			msg: "animales insertadas exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al insertar las animales",
		});
	}
};

const updateAnimal = async (req, res) => {
	try {
		const { id } = req.params; // Obtener el ID de la animal a actualizar desde los parámetros de la URL
		const { name, nameSpanish, nameEnglish } = req.body; // Obtener los nuevos datos de la animal desde el cuerpo de la solicitud

		// Buscar la animal por su ID y actualizar los campos correspondientes
		const updatedAnimal = await Animal.findByIdAndUpdate(
			id,
			{
				name,
				nameSpanish,
				nameEnglish,
			},
			{ new: true } // Devolver el documento actualizado
		);

		if (!updatedAnimal) {
			return res.status(404).json({
				ok: false,
				msg: "animal no encontrada",
			});
		}

		res.json({
			ok: true,
			animal: updatedAnimal,
			msg: "animal actualizada exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al actualizar la animal",
		});
	}
};

const deleteAnimal = async (req, res) => {
	try {
		const { id } = req.params; // Obtener el ID de la animal a eliminar desde los parámetros de la URL

		// Buscar la animal por su ID y eliminarla
		const deletedAnimal = await Animal.findByIdAndDelete(id);

		if (!deletedAnimal) {
			return res.status(404).json({
				ok: false,
				msg: "Animal no encontrada",
			});
		}

		res.json({
			ok: true,
			msg: "animal eliminada exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al eliminar la animal",
		});
	}
};

const deleteAnimalByType = async (req, res) => {
	try {
		const { type } = req.params; // Obtener el ID de la animal a eliminar desde los parámetros de la URL

		// Buscar la animal por su ID y eliminarla
		const Animals = await Animal.find({
			animal: type.toUpperCase(),
		}).deleteMany();

		console.log(Animals);

		if (!Animals) {
			return res.status(404).json({
				ok: false,
				msg: "animales no encontrada",
			});
		}

		res.json({
			ok: true,
			msg: "animal eliminada exitosamente",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al eliminar la animal",
		});
	}
};

const deleteAllAnimal = async (req, res) => {
	try {
		// Buscar la animal por su ID y eliminarla
		// const deletedAnimal = await Animal.deleteMany({});
		const deletedAnimal = await Animal.collection.drop();

		// if (!deletedAnimal) {
		//   return res.status(404).json({
		//     ok: false,
		//     msg: "animal no encontrada",
		//   });
		// }

		res.json({
			ok: true,
			msg: "animales eliminadas exitosamente",
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
	getAnimals,
	getAnimalsByType,
	getAnimalsByTypeSearch,
	getAnimal,
	createAnimal,
	insertAnimals,
	updateAnimal,
	deleteAnimal,
	deleteAnimalByType,
	deleteAllAnimal,
};
