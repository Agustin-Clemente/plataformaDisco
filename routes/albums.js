const express = require('express')
const albumsRouter = express.Router()

const albums= [
  {
    "id": "1",
    "nombre": "De noche",
    "anio": 2020,
    "url": "img/deNoche.jpeg"
  },
  {
    "id": "2",
    "nombre": "Anime Covers",
    "anio": 2019,
    "url": "img/anime.jpg"
  },
  {
    "id": "3",
    "nombre": "Videogames Covers",
    "anio": 2019,
    "url": "img/videogames.jpg"
  },
  {
    "id": "4",
    "nombre": "Rock Pop covers",
    "anio": 2018,
    "url": "img/Rock-Pop.jpg"
  }
]


albumsRouter.get('/', function (req, res) {
    res.status(200).send(albums);
  }); 

  albumsRouter.get("/:id", (req, res)=>{
   
    const id = req.params.id

    const albumBuscado = albums.filter((album)=>album.id === id)

    res.status(200).send(albumBuscado)
})

 module.exports = albumsRouter