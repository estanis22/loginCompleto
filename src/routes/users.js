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
const guestPageMiddleware = require ("../middlewares/guestPageMiddleware")
const userPageMiddleware= require ("../middlewares/userPageMiddleware")


router.get('/login', guestPageMiddleware, usersController.login);
router.get('/register', guestPageMiddleware, usersController.register);
router.get('/profile', userPageMiddleware, usersController.profile);
router.get('*', usersController.index);// Este get debe ir ultimo!
router.get('/logout', guestPageMiddleware, usersController.logout);
// mismo name que en html "avatar"
router.post('/register', uploadFile.single ("avatar"), validationsRegister, usersController.processRegister);
router.post('/profile', validationsLogin, usersController.processLogin);

module.exports = router; 