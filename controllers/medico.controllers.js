const { response } = require("express")

const Medico = require("../model/medico.model")

const getMedico = async (req, res = response) => {
	const medicos = await Medico.find()
		.populate("hospital", "nombre")
		.populate("usuario", "nombre img")

	res.status(200).json({
		ok: true,
		medicos,
	})
}

const postMedico = async (req, res = response) => {
	try {
		const medico = new Medico({
			usuario: req.id,
			...req.body,
		})

		const medicoDB = await medico.save()

		res.status(200).json({
			ok: true,
			medicoDB,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado",
		})
	}
}

const putMedico = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: "Actualizar Médicos",
	})
}

const deleteMedico = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: "Eliminar Médicos",
	})
}

module.exports = {
	getMedico,
	postMedico,
	putMedico,
	deleteMedico,
}
