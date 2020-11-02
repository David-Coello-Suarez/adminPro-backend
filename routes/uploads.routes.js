/*
     Ruta: /api/uploads/:query
*/
const router = require("express").Router()
const expFileUpload = require("express-fileupload")

const { validarJWT } = require("../middlewares/validar-jwt")
const { fileUpload, retornaImg } = require("../controllers/uploads.controllers")

router.use(expFileUpload())

router.put("/:tipo/:id", validarJWT, fileUpload)

router.get("/:tipo/:img", retornaImg)

module.exports = router
