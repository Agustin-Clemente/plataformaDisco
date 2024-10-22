const express = require('express')
const albumsRouter = express.Router()
const Albums = require('../models/Album')


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

//Una ruta que devuelva todos los albums.
/* albumsRouter.get('/', function (req, res) {
    res.status(200).send(albums);
  });  */
  
  albumsRouter.get('/', async (req, res)=>{
    try {
      const result = await Albums.find({})
  
      res.status(200).send(result)
    } catch (error) {
      res.status(404).send("No data")
    }
  })

  //Una ruta que devuelva la información de un album especifíco.
  /* albumsRouter.get("/:id", (req, res)=>{
   
    const id = req.params.id

    const albumBuscado = albums.filter((album)=>album.id === id)

    res.status(200).send(albumBuscado)
}) */
    albumsRouter.get('/:id', async (req, res)=>{
      try {
        const result = await Albums.find({_id: req.params.id})
        res.status(200).send(result)
      } catch (error) {
        res.status(404).send("Album no encontrado")
      }
    })

//Una ruta para agregar un album.
albumsRouter.post('/', async (req, res)=>{
  try {
    await Albums.create(req.body)
    res.status(201).send("Album creado correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al crear Album")
  }
})

//Una ruta para editar un album.
albumsRouter.put('/:id', async (req, res)=>{
  try {
      const id = req.params.id
      const newInfo = req.body

      console.log("NEW INFO", newInfo)

      //const arr = [ { nombre: 'Agus'} ]

      await Albums.findByIdAndUpdate(id, newInfo, {new: true})

    res.status(200).send("Album actualizado correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error en la actualizacion")
  }
})

//Una ruta para agregar o eliminar una canción del album.
albumsRouter.post('/:id', async (req, res) => {
  try {
    const album = await Albums.findById(req.params.id);
    if (!album) return res.status(404).send('Album no encontrado');
    
    album.canciones.push(req.body);
    await album.save();
    
    res.status(201).send("Canción agregada correctamente");
  } catch (err) {
    res.status(500).send(err);
  }
});

albumsRouter.delete('/:id/songs/:songId', async (req, res) => {
  try {
    const album = await Albums.findById(req.params.id);
    if (!album) return res.status(404).send('Album no encontrado');
    
    const songIndex = album.canciones.findIndex(c => c._id.toString() === req.params.songId);
    if (songIndex === -1) return res.status(404).send('Canción no encontrada');
    
    album.canciones.splice(songIndex, 1);
    await album.save();
    
    res.status(200).send("Canción eliminada correctamente");
  } catch (err) {
    res.status(500).send(err);
  }
});

//Una ruta para eliminar un album.
albumsRouter.delete('/:id', async (req, res)=>{
  try {
      const id = req.params.id
      await Albums.findByIdAndDelete(id)

    res.status(200).send("Album eliminado correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al eliminar album")
  }
})



 module.exports = albumsRouter