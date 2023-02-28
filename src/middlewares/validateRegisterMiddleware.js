const path = require ("path")
const { body } = require ("express-validator")

const registerValidator = [
    // los name son los del html!!
    body("fullName").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("email").notEmpty().withMessage("Tiene que escribir un email").bail()
        .isEmail().withMessage("Debes escribir un email valido"),
    body("password").notEmpty().withMessage("Debes escribir una contraseña"),
    body("country").notEmpty().withMessage("Tienes que elegir un pais")
    
]

module.exports = registerValidator
/*body("avatar").custom((value, { req }) => {
    let file = req.file
    let acceptedExtensions = [ ".jpg", ".png", ".gif"];

    if (!file){
        throw new Error ("Tienes que subir imagen")
    }else{
        let fileExtension = path.extname(file.originalname)
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error ("Las extensiones permitidas son " + acceptedExtensions.join(", "))
        }
    }
})*/