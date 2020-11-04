const { response } = require("express")

const Hospital = require("../model/hospital.model")

const getHospitales = async (req, res = response) => {
	const hospitales = await Hospital.find().populate("usuario", "nombre img")

	res.status(200).json({
		ok: true,
		hospitales,
	})
}

const postHospitales = async (req, res = response) => {
	try {
		const hospital = new Hospital({
			usuario: req.id,
			...req.body,
		})

		const hospitalDB = await hospital.save()

		res.status(200).json({
			ok: true,
			hospitalDB,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado",
		})
	}
}

const putHospitales = async (req, res = response) => {
	try {
		const { id } = req.params

		const hospitalDB = await Hospital.findById(id)
		if (!hospitalDB) {
			return res.status(404).json({
				ok: true,
				msg: "No se encontro un hospital con ese id",
			})
		}

		const cambiosHosp = {
			...req.body,
			usuario: req.id,
		}

		const hospActua = await Hospital.findByIdAndUpdate(id, cambiosHosp, {
			new: true,
		})

		res.status(200).json({
			ok: true,
			hospActua,
		})
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		})
	}
}

const deleteHospitales = async (req, res = response) => {
	try {
		const { id } = req.params

		const hospitalDB = await Hospital.findById(id)
		if (!hospitalDB) {
			return res.status(404).json({
				ok: true,
				msg: "No se encontro un hospital con ese id",
			})
		}

		await Hospital.findByIdAndDelete(id)

		res.status(200).json({
			ok: true,
			msg: "Hospital eliminado",
		})
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		})
	}
}

module.exports = {
	getHospitales,
	postHospitales,
	putHospitales,
	deleteHospitales,
}
