const express = require('express')
const usuariosRouter = express.Router()
const Usuarios = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
  //usuariosRouter.get("/:id", async (req, res)=>{
  usuariosRouter.get("/user/:id", async (req, res)=>{
   
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

  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const email = req.body.email
  const password = req.body.password

  try {
    const contrasenaHasheada = await hashPassword(password)

    //await Usuarios.create(req.body)
    const newUser = new Usuarios({ nombre: nombre, apellido: apellido, email: email, password: contrasenaHasheada });
    await newUser.save();
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

// BONUS - Registro 1. Encriptado
//Construir una función hashPassword, que deberá ser asincrónica y que utilizará el método hash de bcrypt para hashear la contraseña.
//En la ruta de registro de tu backend deberás tomar la contraseña de tu usuario del req body y hashearla.
const saltRounds = 10

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password,saltRounds)
  return hash
}

// BONUS - Login 1. Back-end
usuariosRouter.post('/login', async (req,res,next)=>{
  try{
      const {password,email,nombre, apellido, _id} = await Usuarios.findOne({"email":req.body.email})
      const match = await bcrypt.compare(req.body.password, password);
      const payload = {email, nombre, apellido, id:_id}
      if(match){
        const secret = "hola"
        const token = jwt.sign(payload, secret, { expiresIn: '24h' })
        res.cookie('token',token)
        res.status(200).send(payload)
      }
     else{
      res.status(401).send({message:'Wrong email or password'})
     }
  }
  catch(error){
    res.status(401).send({message:'User does not exist'})
  }
})

// BONUS - Logout 1. Back-end
usuariosRouter.post('/logout', async (req,res)=>{
    try {
      res.clearCookie('token'); 
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cerrar sesión");
    }
  });

// BONUS - Acceso Restringido - 1. Ruta /me
usuariosRouter.get('/me', (req, res) => {
  try{
    const token = req.cookies.token;
    //console.log(token)
    const secret = "hola"
    const  payload = jwt.verify(token, secret);
    res.status(200).send(payload);
    //console.log(payload)
  }
  catch(error){
    res.status(401).send(error)
  }
});



 module.exports = usuariosRouter