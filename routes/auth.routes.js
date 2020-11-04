/*
    Path: '/api/login
*/

const router = require("express").Router()
const { check } = require("express-validator")

const { validarCampos } = require("../middlewares/validar-campos")
const { validarJWT } = require("../middlewares/validar-jwt")
const {
	googleSignIn,
	login,
	renewToken,
} = require("../controllers/auth.controllers")

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password es obligatorio").not().isEmpty(),
		validarCampos,
	],
	login
)

router.post(
	"/google",
	[
		check("token", "El token de google es obligatorio").not().isEmpty(),
		validarCampos,
	],
	googleSignIn
)

router.get("/renew", validarJWT, renewToken)

module.exports = router
