const express = require('express');
const methodOverride = require ("method-override"); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');




const app = express();



// ************ Middlewares **********
app.use(express.static("./public")); // carpeta estatica
app.use(express.urlencoded({ extended: false })); // este es para mandar peticiones a traves de POST, para tener la info en req.body
app.use(express.static("./public")); // carpeta estatica
app.use(express.json()); // para usar json
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
secret: 'Nombre del sitio',
      resave: false,
      saveUninitialized: false,
}));
app.use(cookieParser());
const userLoggedMiddleware = require ("./src/middlewares/userLoggedMiddleware") // requiero el middleware para ver si hay alguien logueado.
app.use(userLoggedMiddleware); // SI o SI tiene que estar despues de session!!!!!



// ************ Template Engine ************
app.set("view engine", "ejs"); // motor de vistas, le estoy avisando a express que los archivos que tiene que renderizar son ejs
app.set("views", "./src/views"); // define la ubicacion de la carpeta vistas


app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo');
});
const usersRoutes = require('./src/routes/users'); // rutas users

app.use('/', usersRoutes); // el primer parametro es la ruta raiz o principal, el segundo el archivo a usar para resolver esas rutas.