const mongoose = require("mongoose")

const songModel = new mongoose.Schema({ //inicializo schema
  titulo: { type: String, required: [true, "Campo requerido"] },
  link: { type: String },
  duracion: {
    type: String,
    required: [true, "Campo requerido"],
    validate: {
      validator: function (v) {
        return /^\d+(\.\d+)?(:\d+(\.\d+)?)?$/.test(v); // Solo permite números y :
      },
      message: props => `${props.value} is not a valid duration!`
    }
  },
  album: { type: String }
})

module.exports = mongoose.model("songModel", songModel)
