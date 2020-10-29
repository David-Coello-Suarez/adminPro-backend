const { response } = require("express");
const  bycrypt = require("bcryptjs");

const Usuario = require("../model/usuario.model");
const { generarToken } = require("../helpers/jwt");

const login = async ( req, res = response ) => {
    try {
        const { email, password } = req.body;

        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: "Email no válido"
            });
        }

        // Verificar contraseña
        const validaPass = bycrypt.compareSync( password, usuarioDB.password );

        if( !validaPass ){
            return res.status(400).json({
                ok: false,
                msg: "Contraseña no valida"
            });
        }

        //Generar el token - jwt
        const token = await generarToken(usuarioDB.id);

        res.json({
            ok: true,
            token
        });      
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado....!!"
        });
    }
}

module.exports = {
    login
}