const path = require ("path")
const { body } = require ("express-validator")

const createProductValidator = [
    // los name son los del html!!
    body("name").notEmpty().withMessage("Tienes que escribir un producto"),
    body("price").notEmpty().withMessage("Tiene que escribir un precio"),
    body("discount").notEmpty().withMessage("Si no tiene descuento poner 0"),
    // body("stock").notEmpty().withMessage("Tienes que elegir un pais")
    body("bodega_id").notEmpty().withMessage("Tienes que elegir una bodega"),
    body("size_id").notEmpty().withMessage("Tienes que elegir un tamaño"),
    body("category_id").notEmpty().withMessage("Tienes que elegir una categoria"),
    // body("image_id").notEmpty().withMessage("Tienes que elegir un pais")
    body("description_id").notEmpty().withMessage("Tienes que escribir una descripcion"),
    body("province_id").notEmpty().withMessage("Tienes que elegir una provincia"),
    
]

module.exports = createProductValidator