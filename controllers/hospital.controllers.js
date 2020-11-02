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

const putHospitales = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: "Actualizar Hospitales",
	})
}

const deleteHospitales = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: "Eliminar Hospitales",
	})
}

module.exports = {
	getHospitales,
	postHospitales,
	putHospitales,
	deleteHospitales,
}
