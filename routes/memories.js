const express = require('express');
const router = express.Router();
const memoriesController = require('../controller/memories.controller');
const {isAuth} = require('../middleware/auth.middleware');
const upload = require('../helper/image-upload');

/* GET home page. */
router.get('/', isAuth, memoriesController.posts);
router.get('/post', isAuth, memoriesController.form);
router.get('/edit/:id', isAuth, memoriesController.editMemories);


router.post('/like/:id', isAuth, memoriesController.like);
router.post('/post', isAuth, upload.single('profile-file'), memoriesController.addMemories);

module.exports = router;
