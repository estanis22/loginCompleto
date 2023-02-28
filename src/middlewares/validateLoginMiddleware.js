const path = require ("path")
const { body } = require ("express-validator")

const loginValidator = [
    // los name son los del html!!
    body("email").notEmpty().withMessage("Tiene que escribir un email").bail()
        .isEmail().withMessage("Debes escribir un email valido"),
    body("password").notEmpty().withMessage("Debes escribir una contraseña")
]

module.exports = loginValidator