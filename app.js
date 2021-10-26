//El módulo path proporciona utilidades para trabajar con rutas de archivos y directorios
const path = require('path');
const express = require('express');
/*
Manejo de middleware con express
npm install morgan --save
Morgan es un modulo (middleware) que permite mostrar por consola lo que las aplicaciones clientes van pidiendo
*/
const morgan = require('morgan');
/*
Mongoose es una biblioteca de JavaScript que le permite definir esquemas con datos 
fuertemente tipados. Una vez que se define un esquema, 
Mongoose le permite crear un Modelo basado en un esquema específico. 
Un modelo de mongoose se asigna a un documento MongoDB a través de la 
definición del esquema del modelo.
Instalación: npm install mongoose --save
 */
const mongoose = require('mongoose');

const app = express();

// Conexión a la base de datos de MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/crud-mongo-tasks') 
  .then(db => console.log('Database MongoDB - crud-mongo-tasks connected'))
  .catch(err => console.log(err));

// Importando rutas
const indexRoutes = require('./routes/index');

// Configuración de variables a través de app.set (settings)
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

/*
Motor de plantillas ejs (otro es pug, por ejemplo)
$ npm install ejs*/
app.set('view engine', 'ejs'); 

// middlewares: Modulos instalados para funciones que se ejecutan antes de ingresar a las rutas
/*
Salida concisa coloreada por estado de respuesta para uso en desarrollo. 
El :status token será de color verde para los códigos de éxito, 
rojo para los códigos de error del servidor, 
amarillo para los códigos de error del cliente, 
cian para los códigos de redirección y sin color para los códigos de información.
*/
app.use(morgan('dev'));
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));// reconocimiento de formato json
app.use(express.urlencoded());// parsear a formato de json
// routes
app.use('/', indexRoutes);


app.listen(app.get('port'), () => {
  console.log(`Server is running in http://localhost:${app.get('port')}`);
});


