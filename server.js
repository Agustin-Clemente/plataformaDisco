//Server
const express = require('express')
const app = express();
const routes = require("./routes/index")
const mongoose = require("mongoose")
const url = "mongodb+srv://aclemente:dbQEP5IWo1pmdrhv@curso-intro.sf0px.mongodb.net/?retryWrites=true&w=majority&appName=Curso-Intro";
const userModel = require("./models/User")
const albums = require("./models/Album")

app.use(express.json());

app.use("/", routes) //cada vez que se hace un pedido a / que vaya a routes

const connect = async () => {
    try {
        await mongoose.connect(url);
        app.listen(5000, () => {
            console.log('Server listening on port 5000 and DB connected')
        })

    } catch (error) {
        console.log(error)
    }
}

connect()


