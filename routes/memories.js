const express = require('express');
const router = express.Router();
const memoriesController = require('../controller/memories.controller');
const {isAuth} = require('../middleware/auth.middleware');


/* GET home page. */
router.get('/', isAuth, memoriesController.posts);
router.get('/post', isAuth, memoriesController.form);
router.post('/like/:id', isAuth, memoriesController.like);

router.post('/post', isAuth, memoriesController.addMemories);

module.exports = router;
