const { response } = require("express")
const bycrypt = require("bcryptjs")

const Usuario = require("../model/usuario.model")
const { generarToken } = require("../helpers/jwt")
const { googleverify } = require("../helpers/google-verify")

const login = async (req, res = response) => {
	try {
		const { email, password } = req.body

		const usuarioDB = await Usuario.findOne({ email })

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "Email no válido",
			})
		}

		// Verificar contraseña
		const validaPass = bycrypt.compareSync(password, usuarioDB.password)

		if (!validaPass) {
			return res.status(400).json({
				ok: false,
				msg: "Contraseña no valida",
			})
		}

		//Generar el token - jwt
		const token = await generarToken(usuarioDB.id)

		res.json({
			ok: true,
			token,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado....!!",
		})
	}
}

const googleSignIn = async (req, res = response) => {
	try {
		const googleToken = req.body.token
		const { name, email, picture } = await googleverify(googleToken)

		const usuarioDB = await Usuario.findOne({ email })
		let usuario

		if (!usuarioDB) {
			usuario = new Usuario({
				nombre: name,
				email,
				password: "@@@@",
				img: picture,
				google: true,
			})
		} else {
			usuario = usuarioDB
			usuario.google = true
			// usuario.password = "@@@@"
		}

		await usuario.save()

		//Generar el token - jwt
		const token = await generarToken(usuario.id)

		res.status(200).json({
			ok: true,
			token,
		})
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: "Token Incorrecto",
		})
	}
}

const renewToken = async (req, res = response) => {
	//Generar el token - jwt
	const token = await generarToken(req.id)

	res.json({
		ok: true,
		token,
	})
}

module.exports = {
	login,
	googleSignIn,
	renewToken,
}
