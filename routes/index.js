const express = require('express')
const router = express.Router()

/* app.get('/', (req, res) => {
  res.send('Hello World!')
})  */

  router.get('/', function (req, res) {
    res.status(200).send('Hola mundo!');
  }); 

 module.exports = router