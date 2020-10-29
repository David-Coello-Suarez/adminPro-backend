/*
    Path: '/api/login
*/

const router = require('express').Router();
const { check } = require('express-validator');

const { validarCampos } = require("../middlewares/validar-campos")
const { login } = require('../controllers/auth.controllers');

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    login
);

module.exports = router;