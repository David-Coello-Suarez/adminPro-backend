/*
    Rutas: /api/hospitales
*/
const router = require("express").Router()

const { check } = require("express-validator")
const {
	getHospitales,
	postHospitales,
	putHospitales,
	deleteHospitales,
} = require("../controllers/hospital.controllers")
const { validarJWT } = require("../middlewares/validar-jwt")
const { validarCampos } = require("../middlewares/validar-campos")

router.get("/", getHospitales)

router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
		validarCampos,
	],
	postHospitales
)

router.put(
	"/:id",
	[
		validarJWT,
		check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
		validarCampos,
	],
	putHospitales
)

router.delete("/:id", validarJWT, deleteHospitales)

module.exports = router
