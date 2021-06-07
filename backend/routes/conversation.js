const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ConversationController = require('../controllers/conversation');

// Routes des Conversations
router.get('/', auth, ConversationController.getAllConversation);
router.post('/', auth, ConversationController.newConversation);
router.get('/:id', auth, ConversationController.getOneConversation);
router.delete('/:id', auth, ConversationController.deleteOneConversation);
router.put('/:id', auth, ConversationController.modifyOneConversation);
router.get('/user/:id', auth, ConversationController.getUserConversations);

// Routes des Commentaires
router.get('/:id/comments', auth, ConversationController.getAllComments);
router.post('/:id/comment/', auth, ConversationController.newComment);
router.delete('/comment/:id', auth, ConversationController.deleteComment);

module.exports = router;