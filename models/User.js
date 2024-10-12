const mongoose = require("mongoose")
const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const userModel = new mongoose.Schema({ //inicializo schema
  nombre: { type: String, required: [true, "Campo requerido"], minlength: [2, "Nombre muy corto"] },
  apellido: { type: String, required: [true, "Campo requerido"] },
  email: {
    type: String, required: [true, "Campo requerido"], validate: {
      validator: function (v) {
        return regex.test(v);
      },
      message: 'Debe ingresar un mail válido'
    }
  },
  password: { type: String, required: [true, "Campo requerido"] },
  favoritos: [{ id: { type: Number } }]
})

module.exports = mongoose.model("userModel", userModel)