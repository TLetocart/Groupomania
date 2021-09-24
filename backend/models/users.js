const { Sequelize, Model, DataTypes, TimeoutError } = require('sequelize');
const sequelize = require('../database_connect');

// Schéma de données de l'utilisateur
const User = sequelize.define('user', {
  email: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
    unique: true,
    isEmail: true
  },
  password: {
    type: Sequelize.DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DataTypes.DATE
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: true,
    type: Sequelize.DataTypes.DATE
  },
  firstname: {
    field: 'prenom',
    type: Sequelize.DataTypes.TEXT,
  },
  lastname: {
    field: 'nom',
    type: Sequelize.DataTypes.TEXT,
  }
  
},
{
  tableName: 'user'
});


// Exportation du schema d'inscription
module.exports = User;