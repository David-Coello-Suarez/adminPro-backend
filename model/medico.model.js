const { Schema, model } = require("mongoose")

const medicoSchema = Schema({
	nombre: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: "Usuarios",
		required: true,
	},
	hospital: {
		type: Schema.Types.ObjectId,
		ref: "Hospital",
		required: true,
	},
})

medicoSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})

module.exports = model("Medico", medicoSchema)
