const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user.js');
const password = require('../middleware/password.js');

// Routes affiliés à l'inscription et la connexion des utilisateurs

router.post('/signup', password, userCtrl.signup); // Ajoute un nouvel utilisateur dans la base de données
router.post('/login', userCtrl.login); // Permet la connexion d'un utilisateur en lui transmettant un token
// router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;