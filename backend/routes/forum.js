const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const forumController = require('../controllers/forum');


router.get('/', auth, forumController.getAllForums);


module.exports = router;