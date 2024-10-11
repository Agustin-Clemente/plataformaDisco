const mongoose = require("mongoose")

const albumModel = new mongoose.Schema({ //inicializo schema
    titulo:{type:String, required:[true, "Campo requerido"]},
    descripcion:{
        type:String, 
        required:[true, "Campo requerido"], 
        minlength:[5, "Descripción muy corta"], 
        maxlength:[200, "Descripción muy extensa"]
    },
    anio:{type:Number, required:[true, "Campo requerido"], min:0},
    portada:{type:String, required:[true, "Campo requerido"]},
    canciones:[{
        titulo:{type: String, required:[true, "Campo requerido"]},
        duracion:{type:Number, required:[true, "Campo requerido"]}
    }]
})

module.exports = mongoose.model("albumModel",albumModel)
