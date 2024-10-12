/* EJEMPLO DE UN MODELO
const mongoose = require("mongoose")

const modelo = new mongoose.Schema({ //inicializo schema
    campo:{
        propiedad:{type: String, required: [true, "Mensaje de error"]},
        propiedad2:{type: Number, required: true, lowercase: true, trim:true, enum: {values: ["a", "b"], message: "mensaje"}}
    },
    campo2:{type:String, min: 0, max:30},
    campo3:[{propiedad1:{type:String}, propiedad2:{type:Number}}]
})

module.exports = mongoose.model("Nombre",modelo) */
