const fs = require('fs');
const regeneratorRuntime = require("regenerator-runtime");
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const uuid = require('uuid');
const file=require('../archivo/archivo')

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`Servidor corriendo en puerto ${port}`);
});

global.administrador=true;

global.arrayProductos=file("productos","leer").then(function(value) {
    arrayProductos=value
    console.log("Productos:")
    console.log(value)
    return value
  }, function(reason) {
    console.log("ERROR:No se pude leer archivo"); // Error!
  })
  global.arrayCarrito=file("productos","leer").then(function(value) {
    arrayProductos=value
    console.log("Carrito:")
    console.log(value)
    return value
  }, function(reason) {
    console.log("ERROR:No se pude leer archivo"); // Error!
  })

//middlewares
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/productos', require('../rutas/api-productos'))
app.use('/carrito', require('../rutas/api-carrito'))
app.use('/', router)



module.exports=administrador