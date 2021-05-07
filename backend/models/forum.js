const { Sequelize, Model, DataTypes, TimeoutError } = require('sequelize');
const sequelize = require('../database_connect');

// Schéma du forum
const Forum = sequelize.define('user', {
  name: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DataTypes.DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DataTypes.DATE
  },
  userId: {
    field: 'userId',
    type: Sequelize.DataTypes.INTEGER(10),
  },

});

// Exportation du schema d'inscription
module.exports = Forum;