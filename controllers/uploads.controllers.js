const path = require("path")
const fs = require("fs")
const { response } = require("express")
const { v4: uuidv4 } = require("uuid")

const { actualizaImg } = require("../helpers/act-img")
const { request } = require("http")

const fileUpload = (req, res = response) => {
	const { tipo, id } = req.params

	if (!["usuarios", "medicos", "hospitales"].includes(tipo)) {
		return res.status(400).json({
			ok: false,
			msg: "No es un médico, usuario u hospital",
		})
	}

	//Existe un archivo
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: "No ha seleccionado un archivo",
		})
	}

	//procesar la imagen
	const file = req.files.imgIcono
	const nameShort = file.name.split(".")
	const extFile = nameShort[nameShort.length - 1]

	if (!["png", "jpg", "jpeg", "gif"].includes(extFile)) {
		return res.status(400).json({
			ok: false,
			msg: "Extension del archivo no permitido",
		})
	}

	//nombre del archivo
	const nameFile = `${uuidv4()}.${extFile}`

	//Oath oara guardar img
	const path = `./uploads/${tipo}/${nameFile}`

	//Mover imagen
	file.mv(path, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).send(err)
		}

		//Actualizar DataBase
		actualizaImg(tipo, id, nameFile)

		res.json({
			ok: true,
			msg: "Archivo subido",
			nameFile,
		})
	})
}

const retornaImg = (req, res = response) => {
	const { tipo, img } = req.params

	let pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`)

	if (!fs.existsSync(pathImg)) {
		pathImg = path.join(__dirname, `../uploads/no-img.png`)
	}

	res.sendFile(pathImg)
}

module.exports = {
	fileUpload,
	retornaImg,
}
