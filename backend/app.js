// Framework de Node.js
const express = require("express");
// Permet de gérer les requêtes HTTP
const cors = require('cors');

const dbconnect = require('./database_connect.js');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation');


const app = express();

// Gestion des images
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

//Transformer les données POST en objet JSON pour les exploiter
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(cors());

app.use('/api/auth', userRoutes);

app.use('/api/conversations', conversationRoutes);

module.exports = app;

// Sécurité

// Configure, les en-têtes HTTP pour protéger de certaines vulnérabilités
const helmet = require('helmet'); 
const session = require('cookie-session');
const nocache = require('nocache')

app.use(helmet());
app.use(nocache()); // Empêche la mise en cache

// Eviter les erreurs CORS pour ouvrir les requêtes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

