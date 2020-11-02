const { Schema, model } = require("mongoose")

const hospitalSchema = Schema(
	{
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
	},
	{ collection: "hospitales" }
)

hospitalSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})

module.exports = model("Hospital", hospitalSchema)
