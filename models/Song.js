const mongoose = require("mongoose")

const songModel = new mongoose.Schema({ //inicializo schema
    titulo: { type: String, required: [true, "Campo requerido"] },
    link: { type: String },
    duracion: { type: Number, required: [true, "Campo requerido"], min: 0 },
    album: { type: String }
})

module.exports = mongoose.model("songModel", songModel)
