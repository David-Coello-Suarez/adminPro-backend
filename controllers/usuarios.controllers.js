const { response } = require("express")
const bycript = require("bcryptjs")

const Usuario = require("../model/usuario.model")
const { generarToken } = require("../helpers/jwt")

const getUsuarios = async (req, res) => {
	const desde = Number(req.query.desde) || 0

	const [usuario, total] = await Promise.all([
		Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
		Usuario.countDocuments(),
	])

	res.json({
		ok: true,
		// uid: req.uid,
		usuario,
		total,
	})
}

const crearUsuarios = async (req, res = response) => {
	const { nombre, email, password } = req.body

	try {
		const existeEmail = await Usuario.findOne({ email })

		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: "El correo ya está registrado",
			})
		}

		const usuario = new Usuario(req.body)

		// Encriptar password
		const salt = bycript.genSaltSync()
		usuario.password = bycript.hashSync(password, salt)

		await usuario.save()

		// Generar el TOKEN -JWT
		const token = await generarToken(usuario.id)

		res.json({
			ok: true,
			usuario,
			token,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado.... revisar logs",
		})
	}
}

const putUsuarios = async (req, res = response) => {
	// TODO: Validar token y comprobar si es el ususuaio es correcto
	try {
		const uid = req.params.id

		const usuarioDB = await Usuario.findById(uid)

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "No existe un usuario por ese id",
			})
		}

		// Actualizaciones
		const { password, google, email, ...campos } = req.body
		if (Usuario.email !== email) {
			const existeEmail = await Usuario.findOne({ email })
			if (existeEmail) {
				return res.status(400).json({
					ok: false,
					msg: "Ya existe un usuario con ese email",
				})
			}
		}

		campos.email = email

		const usuarioUpdate = await Usuario.findByIdAndUpdate(uid, campos, {
			new: true,
		})

		res.json({
			ok: true,
			usuarioUpdate,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado",
		})
	}
}

const deleteUsuarios = async (req, res = response) => {
	try {
		const uid = req.params.id

		const usuarioDB = await Usuario.findById(uid)

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "No existe un usuario por ese id",
			})
		}

		await Usuario.findByIdAndDelete(uid)

		res.status(200).json({
			ok: true,
			msg: "usuario eliminado",
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado",
		})
	}
}

module.exports = {
	getUsuarios,
	crearUsuarios,
	putUsuarios,
	deleteUsuarios,
}
