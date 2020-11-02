const fs = require("fs")

const Hospital = require("../model/hospital.model")
const Usuarios = require("../model/usuario.model")
const Medicos = require("../model/medico.model")

const borrarImg = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path)
	}
}

const actualizaImg = async (tipo, id, nameFile) => {
	let pathOld
	switch (tipo) {
		case "hospitales":
			const hopitalDB = await Hospital.findById(id)
			if (!hopitalDB) {
				console.log("No se encontro hopital por id")
				return false
			}

			pathOld = `./uploads/hopitales/${hopitalDB.img}`
			borrarImg(pathOld)

			hopitalDB.img = nameFile
			await hopitalDB.save()

			return true
		case "usuarios":
			const usuarioDB = await Usuarios.findById(id)
			if (!usuarioDB) {
				console.log("No se encontro usuario por id")
				return false
			}

			pathOld = `./uploads/hopitales/${usuarioDB.img}`
			borrarImg(pathOld)

			usuarioDB.img = nameFile
			await usuarioDB.save()

			return true
		case "medicos":
			const medicoDB = await Medicos.findById(id)
			if (!medicoDB) {
				console.log("No se encontro medico por id")
				return false
			}

			pathOld = `./uploads/medicos/${medicoDB.img}`
			borrarImg(pathOld)

			medicoDB.img = nameFile
			await medicoDB.save()

			return true
		default:
			break
	}
}

module.exports = {
	actualizaImg,
}
