// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');
const bcrypt = require ("bcryptjs");
const { validationResult } = require('express-validator');

// indico la ruta de mi archivo .json, la abosulta.
const usersFilePath = path.join(__dirname, '../data/usersDB.json');
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los users del .json.
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const usersController = {
  register: (req,res) => {
    return res.render("register")
  },
  login: (req,res) => {
    return res.render("login")
  },
  profile: (req,res) => {
    return res.render("profile", {user: req.session.userLogged})
  },
  processRegister:(req,res) => {
    // este genera un array con objetos literales con lo que recibe el body, msg, value, etc
    const resultValidation = validationResult(req)
    // si hay errores, renderizo nuevamente la vista register
    if (resultValidation.errors.length > 0 ) {
      res.render ("register", {
        // le sumo los errores, el mapped te da un objeto de objetos literales (fullName, password, email, etc), cada uno tiene sus propiedades.
        errors: resultValidation.mapped(),
        // dejo los datos que estan ok
        oldData: req.body
      });
    }; 
    let userInDB = users.find(user => user.email === req.body.email)
    if (userInDB) {
      // Enviar un mensaje de error
      return res.render("register", {
        errors: {
          email: {
            msg: "El email ya está registrado"
          }
        },
        oldData: req.body
      });
    };
    let newUser = {
      id: Date.now(),
      fullName: req.body.fullName,
      email: req.body.email,
      // encripto contraseña, el 10 se pone, es para que tenga un minimo de dificultad
      password:bcrypt.hashSync(req.body.password, 10),
      country: req.body.country,
      avatar: " "//req.file.filename,
    };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
    // vulevo a /
    return res.render("login")
  },
  processLogin: (req, res) => {
    // este genera un array con objetos literales con lo que recibe el body, msg, value, etc
    const resultValidation = validationResult(req)
    // si hay errores, renderizo nuevamente la vista register
    if (resultValidation.errors.length > 0 ) {
      res.render ("login", {
        // le sumo los errores, el mapped te da un objeto de objetos literales (fullName, password, email, etc), cada uno tiene sus propiedades.
        errors: resultValidation.mapped(),
        // dejo los datos que estan ok
        oldData: req.body
      })
    }
    let userToLogin = users.find(user => user.email === req.body.email)
    if(userToLogin == null){
      return res.render("login", {
        errors: {
          email: {
            msg: "No se encuentra registrado"
          }
        },
        oldData: req.body
      });
    } else {
      let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);
      if (passwordOk) {
        req.session.userLogged = userToLogin
        if(req.body.rememberme){
          res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2})
        }
        return res.redirect ("/profile")
      } else {
        return res.render("login", {
          errors: {
            password: {
              msg: "Contraseña incorrecta"
            }
          },
          oldData: req.body
        });
      }
    }
  },
  index: (req, res) => {
    if (req.session.userLogged) {
      // Si el usuario está logueado, redirigirlo a su perfil
      return res.redirect('profile');
    } else {
      // Si el usuario no está logueado, redirigirlo a la vista de login
      return res.redirect('login');
    }
  },
  logout: (req,res) => {
    res.clearCookie("userEmail")
    req.session.destroy();
    return res.redirect("login")
  }
}

module.exports = usersController
