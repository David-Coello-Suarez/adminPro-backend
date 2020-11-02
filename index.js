require("dotenv").config()

const express = require("express")
const cors = require("cors")

const { dbconecction } = require("./database/config")

//Creando el servidor de express
const app = express()

//Configurar cors
app.use(cors())

//Lectura y parseo del body
app.use(express.json())

// Base de datos
dbconecction()

// mongo : mean_user, aO3lFtF4dEBaKOmd

//Rutas
app.use("/api/usuarios", require("./routes/usuarios.routes"))
app.use("/api/hospital", require("./routes/hospital.routes"))
app.use("/api/busqueda", require("./routes/busqueda.routes"))
app.use("/api/uploads", require("./routes/uploads.routes"))
app.use("/api/medico", require("./routes/medico.routes"))
app.use("/api/login", require("./routes/auth.routes"))

app.listen(process.env.PORT, () => {
	console.log("Servidor corriendo en el puerto " + process.env.PORT)
})
