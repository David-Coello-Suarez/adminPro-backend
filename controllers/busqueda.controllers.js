const { response } = require("express")

const Usuarios = require("../model/usuario.model")
const Medicos = require("../model/medico.model")
const Hospital = require("../model/hospital.model")

const getBusqueda = async (req, res = response) => {
	const query = req.params.query

	const regex = new RegExp(query, "i")

	const [usuarios, medicos, hospital] = await Promise.all([
		Usuarios.find({ nombre: regex }),
		Medicos.find({ nombre: regex }),
		Hospital.find({ nombre: regex }),
	])

	res.status(200).json({
		ok: true,
		usuarios,
		medicos,
		hospital,
	})
}

const getBusqEsp = async (req, res = response) => {
	const query = req.params.query
	const tabla = req.params.tabla

	const regex = new RegExp(query, "i")

	let data

	switch (tabla) {
		case "medicos":
			data = await Medicos.find({ nombre: regex })
				.populate("usuario", "nombre img")
				.populate("hospital", "nombre img")
			break
		case "hospitales":
			data = await Hospital.find({ nombre: regex }).populate(
				"usuario",
				"nombre img"
			)
			break
		case "usuarios":
			data = await Usuarios.find({ nombre: regex })
			break
		default:
			return res.status(400).json({
				ok: false,
				msg: "La table tiene que ser usuarios/medicos/hospitales",
			})
	}

	res.status(200).json({
		ok: true,
		data,
	})
}

module.exports = {
	getBusqueda,
	getBusqEsp,
}
