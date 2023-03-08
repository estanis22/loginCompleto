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
const requireLogin = require ("../middlewares/requireLogin")
const noHomeMiddleware= require ("../middlewares/noHomeMiddleware")
const userMiddleware = require ("../middlewares/userMiddleware")


router.get('/login', requireLogin, usersController.login);
router.get('/register', requireLogin, usersController.register);
router.get('/profile', requireLogin, usersController.profile);
router.get('*', usersController.index);// Este get debe ir ultimo!
router.get('/logout',requireLogin, usersController.logout);
// mismo name que en html "avatar"
router.post('/register', uploadFile.single ("avatar"), validationsRegister, usersController.processRegister);
router.post('/profile', validationsLogin, usersController.processLogin);

module.exports = router; 