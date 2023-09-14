const { response } = require("express");
const Race = require("../model/Race");

const getRaces = async (req, res = response) => {
	// // get races from database mongo with moongose
	// // with query params limit and offset
	// try {
	// 	// Obtener los parámetros de consulta limit y offset
	// 	const { limit = 5, offset = 0 } = req.query;

	// 	const races = await Race.find().skip(Number(offset)).limit(Number(limit));

	// 	res.json({
	// 		ok: true,
	// 		races,
	// 		pagination: {
	// 			limit: Number(limit),
	// 			offset: Number(offset),
	// 		},
	// 	});
	// } catch (error) {
	// 	console.error(error);
	// 	res.status(500).json({
	// 		ok: false,
	// 		msg: "Error al obtener las razas",
	// 	});
	// }
	try {
		// Obtener los parámetros de consulta limit y offset
		const { limit = 5, offset = 0, page = 1, type, search } = req.query;

		// const newOffset = (Number(page) - 1) * Number(limit);
		const newOffset = offset;

		// Construir el objeto de consulta para buscar las razas
		const query = {};

		// Realizar la consulta a la base de datos utilizando Mongoose
		// const races = await Race.find(query)
		//   .skip(Number(offset))
		//   .limit(Number(limit))
		//   .sort({ name: 1 });
		const races = await Race.find(query)
			.skip(Number(newOffset))
			.limit(Number(limit))
			.sort({
				name: 1,
				createdAt: -1,
			});

		const racesTotal = await Race.find();

		// races searched
		if (search) {
			const racesSearched = await Race.find({
				$or: [
					{ name: { $regex: search.toUpperCase().trim(), $options: "i" } },
					{ animal: { $regex: search.toUpperCase().trim(), $options: "i" } },
					{
						nameSpanish: { $regex: search.toUpperCase().trim(), $options: "i" },
					},
					{
						nameEnglish: { $regex: search.toUpperCase().trim(), $options: "i" },
					},
				],
			})
				.skip(Number(newOffset))
				.limit(Number(limit))
				.sort({ name: 1, createdAt: -1 });
			// console.log(search);
			// console.log(racesSearched);

			const racesSearchedTotal = await Race.find({
				$or: [
					{ name: { $regex: search.toUpperCase().trim(), $options: "i" } },
					{ animal: { $regex: search.toUpperCase().trim(), $options: "i" } },
					{
						nameSpanish: { $regex: search.toUpperCase().trim(), $options: "i" },
					},
					{
						nameEnglish: { $regex: search.toUpperCase().trim(), $options: "i" },
					},
				],
			});

			return res.status(200).json({
				ok: true,
				total: racesSearched.length,
				races: racesSearched,
				pagination: {
					limit: Number(limit),
					// offset: Number(offset),
					offset: Number(newOffset),
					currentPage: Math.ceil(offset / limit) + 1,
					prevPage: Math.ceil(offset / limit),
					nextPage: Math.ceil(offset / limit) + 2,
					// currentPage: Number(page),
					totalPages: Math.ceil(racesSearchedTotal.length / Number(limit)),
				},
			});
		}

		// races filtered by type
		if (type) {
			const racesFiltered = await Race.find({ animal: type })
				.skip(Number(newOffset))
				.limit(Number(limit))
				.sort({
					name: 1,
					createdAt: -1,
				});

			const racesFilteredTotal = await Race.find({ animal: type });
			return res.status(200).json({
				ok: true,
				total: racesFiltered.length,
				races: racesFiltered,
				pagination: {
					limit: Number(limit),
					// offset: Number(offset),
					offset: Number(newOffset),
					currentPage: Math.ceil(offset / limit) + 1,
					prevPage: Math.ceil(offset / limit),
					nextPage: Math.ceil(offset / limit) + 2,
					// currentPage: Number(page),
					totalPages: Math.ceil(racesFilteredTotal.length / Number(limit)),
				},
			});
		}

		return res.status(200).json({
			ok: true,
			total: racesTotal.length,
			races,
			pagination: {
				limit: Number(limit),
				// offset: Number(offset),
				offset: Number(newOffset),
				currentPage: Math.ceil(offset / limit) + 1,
				prevPage: Math.ceil(offset / limit),
				nextPage: Math.ceil(offset / limit) + 2,
				// currentPage: Number(page),
				totalPages: Math.ceil(racesTotal.length / Number(limit)),
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

const getRacesByType = async (req, res = response) => {
	try {
		// Obtener los parámetros de consulta limit y offset
		const { limit = 5, offset = 0, page = 1, type } = req.query;

		const races = await Race.find({ animal: type.toUpperCase() });

		if (races.length === 0) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontraron razas",
			});
		}

		return res.status(200).json({
			ok: true,
			total: races.length,
			races,
			// pagination: {
			// limit: Number(limit),
			// offset: Number(offset),
			// offset: Number(newOffset),
			// currentPage: Math.ceil(offset / limit) + 1,
			// prevPage: Math.ceil(offset / limit),
			// nextPage: Math.ceil(offset / limit) + 2,
			// currentPage: Number(page),
			// totalPages: Math.ceil(racesTotal.length / Number(limit)),
			// },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener las razas",
		});
	}
};

const getRacesByTypeSearch = async (req, res = response) => {
	try {
		// Obtener los parámetros de consulta limit y offset
		const { type, search } = req.query;

		if (!type || !search) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontraron razas",
				race: [],
			});
		}

		const races = await Race.find({
			animal: type.toUpperCase(),
			name: { $regex: search.toUpperCase(), $options: "i" },
		});

		if (races.length === 0) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontraron razas",
			});
		}

		return res.status(200).json({
			ok: true,
			total: races.length,
			race: races[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener las razas",
		});
	}
};

const getRace = async (req, res = response) => {
	const { id } = req.params;

	try {
		const race = await Race.findById(id);

		res.json({
			ok: true,
			race,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error al obtener la raza",
		});
	}
};

const createRace = async (req, res = response) => {
	try {
		// Obtener los datos de la nueva raza desde el cuerpo de la solicitud
		const { animal, name, nameSpanish, nameEnglish } = req.body;

		// Crear una instancia del modelo Race con los datos proporcionados
		const newRace = new Race({
			animal, //para saber si es perro o gato
			name,
			nameSpanish,
			nameEnglish,
		});

		// Guardar la nueva raza en la base de datos
		await newRace.save();

		res.json({
			ok: true,
			race: newRace,
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

const updateRace = async (req, res) => {
	try {
		const { id } = req.params; // Obtener el ID de la raza a actualizar desde los parámetros de la URL
		const { animal, name, nameSpanish, nameEnglish } = req.body; // Obtener los nuevos datos de la raza desde el cuerpo de la solicitud

		// Buscar la raza por su ID y actualizar los campos correspondientes
		const updatedRace = await Race.findByIdAndUpdate(
			id,
			{
				animal,
				name,
				nameSpanish,
				nameEnglish,
			},
			{ new: true } // Devolver el documento actualizado
		);

		if (!updatedRace) {
			return res.status(404).json({
				ok: false,
				msg: "Raza no encontrada",
			});
		}

		res.json({
			ok: true,
			race: updatedRace,
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

const deleteRace = async (req, res) => {
	try {
		const { id } = req.params; // Obtener el ID de la raza a eliminar desde los parámetros de la URL

		// Buscar la raza por su ID y eliminarla
		const deletedRace = await Race.findByIdAndDelete(id);

		if (!deletedRace) {
			return res.status(404).json({
				ok: false,
				msg: "Raza no encontrada",
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

module.exports = {
	getRaces,
	getRacesByType,
	getRacesByTypeSearch,
	getRace,
	createRace,
	updateRace,
	deleteRace,
};
