const { Sequelize, Model, DataTypes, TimeoutError } = require('sequelize');
const sequelize = require('../database_connect');

// Schéma des conversations
const Conversation = sequelize.define('conversation', {
  title: {
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
  forumId: {
    field: 'forum_id',
    type: Sequelize.DataTypes.INTEGER(10),
  },

  userId: {
    field: 'user_id',
    type: Sequelize.DataTypes.INTEGER,
  },
  
},
{
    tableName: 'conversation',
});


// Exportation du schema d'inscription
module.exports = Conversation;