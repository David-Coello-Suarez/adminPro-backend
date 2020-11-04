/*
    Rutas: /api/medicos
*/

const router = require("express").Router()

const {
	getMedico,
	postMedico,
	putMedico,
	deleteMedico,
} = require("../controllers/medico.controllers")
const { validarJWT } = require("../middlewares/validar-jwt")
const { validarCampos } = require("../middlewares/validar-campos")
const { check } = require("express-validator")

router.get("/", getMedico)

router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre es necesario").not().isEmpty(),
		check("hospital", "El id del hospital debe ser válido").isMongoId(),
		validarCampos,
	],
	postMedico
)

router.put(
	"/:id",
	[
		validarJWT,
		check("nombre", "El nombre es necesario").not().isEmpty(),
		check("hospital", "El id del hospital debe ser válido").isMongoId(),
		validarCampos,
	],
	putMedico
)

router.delete("/:id", deleteMedico)

module.exports = router
