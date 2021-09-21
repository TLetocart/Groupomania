const { request } = require("express");
const models = require('../models/index.js')

// Tout les Conversations
exports.getAllConversation = (req, res, next) => {
    models.conversation.findAll({
        include: [
            {
                model: models.user,
                attributes:{ exclude: ['password']}
            },
            {
                model: models.forum
            },
            {
                model: models.message
            }
        ],
        
    }).then(result=>{
        return res.status(200).json(result);
    }); 
};

// Nouveau Conversation
exports.newConversation = (request, response, next) => {
    models.conversation.create({
        title: request.body.title, 
        forumId: request.body.forum_id,  
        userId: request.userId
    }).then(conversation =>{
        response.status(201).json(conversation);
        models.message.create({
            userId : request.userId,
            conversationId : conversation.id,
            content: request.body.content
        });
    }).catch(error =>{
        return response.status(400).json({
            error
        });
    });
};


exports.getOneConversation = (request, response, next) => {
    models.conversation.findOne({
        where:{id:request.params.id},
        attributes:{ exclude: ['forumId', 'userId']},
        include: [
            {
                model: models.forum
            },
            {
                model: models.message
            },
            {
                model: models.user,
                attributes:{ exclude: ['password']}
            }
        ]
    }).then(result => {
        response.status(200).json(result);
    }).catch(error =>{
        return response.status(404).json({
            error
        });
    });
};


exports.deleteOneConversation = (request, response, next) => {
    models.conversation.destroy({where:{id:request.params.id}}).then(result => {
        response.status(204).json(result);
    }).catch(error =>{
        return response.status(404).json({
            error
        });
    });
};


exports.modifyOneConversation = (request, response, next) => {
    models.conversation.update({where:{id:request.params.id}}).then(result => {
        response.status(200).json(result);
    }).catch(error =>{
        return response.status(404).json({
            error
        });
    });
};


exports.getUserConversations = (request, response, next) => {
    models.conversation.findAll({
        where: {
            userId: request.userId
    }}).then(result=>{
        return response.status(200).json(result);
    }); 
};


exports.newComment = (request, response, next) => {
    models.message.create({content: request.body.content, userId: request.userId, conversationId : request.params.id}).then(result =>{
        response.status(201).json(result);
    }).catch(error =>{
        return response.status(400).json({
            error
        });
    });
};


exports.getAllComments = (request, response, next) => {
    models.message.findAll({
        include: [
            {
                model: models.user,
                attributes:{ exclude: ['password']}
            },
        ],
        
    }).then(result=>{
        return response.status(200).json(result);
    }); 
};


exports.deleteComment = (request, response, next) => {
    models.conversation.findOne({
        where:{id:request.params.id},
    }).then(result=>{
        if(request.userId != result.userId){
            return response.status(403).json(result);
        } 
        models.message.destroy({where:{id:request.params.id}}).then(result => {
            response.status(204).json(result);
        }).catch(error =>{
            return response.status(404).json({
                error
            });
        });
    });
};