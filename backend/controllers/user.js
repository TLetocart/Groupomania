// On utilise bcrypt pour hasher les mots de passe
const bcrypt = require('bcrypt');

// On récupère le schéma d'inscription
const User = require('../models/users.js');

// On utilise un token lors de la connexion de l'utilisateur, pour vérifier sa connexion
const jwt = require('jsonwebtoken');

require("dotenv").config();

// On crée un utilisateur
exports.signup = (req, res, next) => {
  // On utilise le hash proposé par bcrypt
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // Création d'un utilisateur avec le schema de incription.js
      const user = User.create({
        email: req.body.email,
        password: hash,
        lastname: req.body.lastname,
        firstname: req.body.firstname
      })
        .then(() => res.status(201).json({
          message: 'Utilisateur enregistré.'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));

};

// On vérifie lors de la connexion si l'utilisateur existe et si le mot de passe est correct
exports.login = (req, res, next) => {
  // On cherche l'utilisateur dans la base
  User.findOne({
      where : { email: req.body.email}
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }

      // On compare les hashs
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user.id
              },
              process.env.JWT_TOKEN,
              {
                expiresIn: '24h' // Délai d'expiration du token
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error: error
    }));
};