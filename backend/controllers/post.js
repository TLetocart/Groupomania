const db = require("../database_connect");
const model = require("../models/conversation.js")

// Tout les posts
exports.getAllPost = (req, res, next) => {
   model.findAll().then(result=>{
        return res.status(200).json(result);
    }); 
    console.log(model.findAll);
};

// Nouveau post
exports.newPost = (req, res, next) => {
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.userId}', '${req.body.title}', NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(201).json({
            message: 'Votre post à été publié !'
        })
    });
};


exports.getOnePost = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};


exports.deleteOnePost = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};


exports.modifyOnePost = (req, res, next) => {
    db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};


exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};


exports.newComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, ${req.body.userId}, ${req.params.id}, NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};


exports.getAllComments = (req, res, next) => {
    db.query(`SELECT users.id, users.nom, users.prenom, comments.id,comments.content, comments.userId, comments.date FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.date DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json(result);
        });
};


exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};