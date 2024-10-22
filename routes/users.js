const express = require('express')
const usuariosRouter = express.Router()
const Usuarios = require('../models/User.js')

//PROBANDO USUARIOS
const usuarios = [
  {
    "id": "1",
    "nombre": "Bart",
    "apellido": "Simpson",
    "email": "eatmyshorts@email.com",
    "direccion": {
      "calle": "Av. Siempreviva 742",
      "ciudad": "Springfield",
      "pais": "Estados Unidos"
    },
    "telefonos": ["555-1234", "555-5678"]
  },
  {
    "id": "2",
    "nombre": "Homer",
    "apellido": "Simpson",
    "email": "homer.simpson@email.com",
    "direccion": {
      "calle": "Av. Siempreviva 742",
      "ciudad": "Springfield",
      "pais": "Estados Unidos"
    },
    "telefonos": ["555-8765", "555-4321"]
  },
  {
    "id": "3",
    "nombre": "Marge",
    "apellido": "Simpson",
    "email": "marge.simpson@email.com",
    "direccion": {
      "calle": "Av. Siempreviva 742",
      "ciudad": "Springfield",
      "pais": "Estados Unidos"
    },
    "telefonos": ["555-2468", "555-1357"]
  },
  {
    "id": "4",
    "nombre": "Lisa",
    "apellido": "Simpson",
    "email": "lisa.simpson@email.com",
    "direccion": {
      "calle": "Av. Siempreviva 742",
      "ciudad": "Springfield",
      "pais": "Estados Unidos"
    },
    "telefonos": ["555-9876", "555-6543"]
  },
  {
    "id": "5",
    "nombre": "Maggie",
    "apellido": "Simpson",
    "email": "maggie.simpson@email.com",
    "direccion": {
      "calle": "Av. Siempreviva 742",
      "ciudad": "Springfield",
      "pais": "Estados Unidos"
    },
    "telefonos": ["555-1111", "555-2222"]
  }
];

usuariosRouter.get('/', function (req, res) {
    res.status(200).send(usuarios);
  }); 


  // Una ruta que reciba un id por params y retorne la data del usuario nuevamente, excluyendo la contraseña.
  usuariosRouter.get("/:id", async (req, res)=>{
   
    const id = req.params.id

    /* const usuarioBuscado = usuarios.filter((usuario)=>usuario.id === id)

    res.status(200).send(usuarioBuscado) */

    try {
      const result = await Usuarios.findById(id).select('-password')
      res.status(200).send(result)
    } catch (error) {
      res.status(404).send("No data")
    }
})

// POST - Una ruta para crear un usuario.
usuariosRouter.post('/', async (req, res)=>{
  try {
    await Usuarios.create(req.body)
    res.status(201).send("Usuario creado correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al crear usuario")
  }
})

// Una ruta para editar los datos de un usuario.
usuariosRouter.put('/:id', async (req, res)=>{
  try {
      const id = req.params.id
      const newInfo = req.body

      console.log("NEW INFO", newInfo)

      //const arr = [ { nombre: 'Agus'} ]

      await Usuarios.findByIdAndUpdate(id, newInfo, {new: true})

    res.status(200).send("Elemento actualizado correctamente")
  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error en la actualizacion")
  }
})


 module.exports = usuariosRouter