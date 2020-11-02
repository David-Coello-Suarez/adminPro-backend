/*
     Ruta: /api/busqueda/:query
*/
const router = require("express").Router()

const {
	getBusqueda,
	getBusqEsp,
} = require("../controllers/busqueda.controllers")
const { validarJWT } = require("../middlewares/validar-jwt")

router.get("/:query", validarJWT, getBusqueda)

router.get("/coleccion/:tabla/:query", validarJWT, getBusqEsp)

module.exports = router
