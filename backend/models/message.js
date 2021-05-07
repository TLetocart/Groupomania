const { Sequelize, Model, DataTypes, TimeoutError } = require('sequelize');
const sequelize = require('../database_connect');

// Schéma des messages
const Message = sequelize.define('user', {
  conversationId: {
    field: 'conversation_id',
    type: Sequelize.DataTypes.INTEGER,
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
  content: {
    type: Sequelize.DataTypes.TEXT,
  },
  userId: {
    field: 'userId',
    type: Sequelize.DataTypes.INTEGER(10),
  },

});

// Exportation du schema d'inscription
module.exports = Message;