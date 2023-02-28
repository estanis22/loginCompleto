// ************ Require's ************
const express = require('express');
const router = express.Router();




// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const usersController = require('../controllers/usersController');

// ************ Middlewares Require ************
const uploadFile = require ("../middlewares/multerMiddleware")
const validationsRegister = require ("../middlewares/validateRegisterMiddleware")
const validationsLogin = require ("../middlewares/validateLoginMiddleware")
const authMiddleware= require ("../middlewares/authMiddleware")
const guestMiddleware = require ("../middlewares/guestMiddleware")


router.get('/login', guestMiddleware, usersController.login);
router.get('/register', guestMiddleware, usersController.register);
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout);
// mismo name que en html "avatar"
router.post('/register', uploadFile.single ("avatar"), validationsRegister, usersController.processRegister);
router.post('/login', validationsLogin , usersController.processLogin);

module.exports = router; 