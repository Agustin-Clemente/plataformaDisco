//Server
const express = require('express')
const app = express();
const routes = require("./routes/index")
const usersRoutes = require("./routes/users")
const albumsRoutes = require("./routes/albums")
const mongoose = require("mongoose")
const url = "mongodb+srv://aclemente:dbQEP5IWo1pmdrhv@curso-intro.sf0px.mongodb.net/?retryWrites=true&w=majority&appName=Curso-Intro";
/* const userModel = require("./models/User")
const albums = require("./models/Album")
const songs = require("./models/Song") */
const path = require("path");
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //Express busca en la carpeta public, en la raíz del proyecto, los archivos estáticos solicitados por el cliente.

app.use("/", routes) //cada vez que se hace un pedido a / que vaya a routes
app.use("/users", usersRoutes)
app.use("/albums", albumsRoutes)

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


