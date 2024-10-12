const express = require('express')
const usuariosRouter = express.Router()

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

  usuariosRouter.get("/:id", (req, res)=>{
   
    const id = req.params.id

    const usuarioBuscado = usuarios.filter((usuario)=>usuario.id === id)

    res.status(200).send(usuarioBuscado)
})

 module.exports = usuariosRouter