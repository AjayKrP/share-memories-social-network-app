const express = require('express');
const router = express.Router();
const friendController = require('../controller/friend.controller');
const {isAuth} = require('../middleware/auth.middleware');
const {friendMappingExist, friendExist, sameUser} = require('../middleware/friend.middleware');


// Get Routes
router.get('/', isAuth, friendController.getFriends);


// Post Routes
router.post('/add/:id', isAuth, sameUser, friendExist, friendMappingExist, friendController.add);
router.post('/remove/:id', isAuth, sameUser, friendExist, friendController.remove);
router.post('/accept/:id', isAuth, sameUser, friendController.accept);

module.exports = router;
