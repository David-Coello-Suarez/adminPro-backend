/*
    Ruta: /api/usuarios
*/
const router = require("express").Router();
const { check } = require("express-validator");

const { getUsuarios, crearUsuarios, putUsuarios, deleteUsuarios } = require("../controllers/usuarios.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.get("/", getUsuarios);

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios
);

router.put("/:id", [
    validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], putUsuarios
);

router.delete("/:id", validarJWT, deleteUsuarios);

module.exports = router;