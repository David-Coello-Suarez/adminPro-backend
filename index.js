require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbconecction } = require('./database/config');

//Creando el servidor de express
const app = express();

// Base de datos
dbconecction();

//Configurar cors
app.use(cors())


// mongo : mean_user, aO3lFtF4dEBaKOmd

//Rutas
app.get("/", (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT);
} )