const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const {isAuth} = require('../middleware/auth.middleware');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// Get Routes
router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/account', isAuth, userController.account);
router.get('/profile/:userId', isAuth, userController.profile);
router.get('/logout', isAuth, userController.logout);

// Post Routes
router.post('/register', userController.registerPost);
router.post('/login', userController.loginPost);

module.exports = router;
