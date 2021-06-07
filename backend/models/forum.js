const { Sequelize, Model, DataTypes, TimeoutError } = require('sequelize');
const sequelize = require('../database_connect');

// Schéma du forum
const Forum = sequelize.define('forum', {
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
  }
}, {
  tableName: 'forum'
});

// Exportation du schema d'inscription
module.exports = Forum;