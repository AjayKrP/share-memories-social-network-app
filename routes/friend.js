const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend.controller');
const {isAuth} = require('../middleware/auth.middleware');


// Get Routes
router.get('/', isAuth, friendController.getFriends);


// Post Routes
router.post('/add/:id', isAuth, friendController.add);
router.post('/remove/:id', isAuth, friendController.remove);
router.post('/accept/:id', isAuth, friendController.accept);

module.exports = router;
