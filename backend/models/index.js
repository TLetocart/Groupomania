const forumModel = require("./forum.js");
const conversationModel = require("./conversation.js");
const messageModel = require("./message.js");
const userModel = require("./users.js");

forumModel.hasMany(conversationModel)

conversationModel.belongsTo(userModel);
conversationModel.belongsTo(forumModel);
conversationModel.hasMany(messageModel)

messageModel.belongsTo(conversationModel)
messageModel.belongsTo(userModel);


userModel.hasMany(messageModel)

module.exports = {
    forum: forumModel,
    conversation: conversationModel,
    message: messageModel,
    user: userModel
}