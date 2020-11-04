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

const putMedico = async (req, res = response) => {
	try {
		const { id } = req.params

		const medicoDB = await Medico.findById(id)

		if (!medicoDB) {
			return res
				.status(404)
				.json({ ok: true, msg: "Usuario no encontrado por id" })
		}

		const medicoactual = {
			...req.body,
			usuario: req.id,
		}

		const medico = await Medico.findByIdAndUpdate(id, medicoactual, {
			new: true,
		})

		res.status(200).json({
			ok: true,
			medico,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		})
	}
}

const deleteMedico = async (req, res = response) => {
	try {
		const { id } = req.params

		const medicoDB = await Medico.findById(id)

		if (!medicoDB) {
			return res
				.status(404)
				.json({ ok: true, msg: "Usuario no encontrado por id" })
		}

		await Medico.findByIdAndDelete(id)

		res.status(200).json({
			ok: true,
			msg: "Medico eliminado",
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		})
	}
}

module.exports = {
	getMedico,
	postMedico,
	putMedico,
	deleteMedico,
}
