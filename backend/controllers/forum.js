const models = require('../models/index.js');

exports.getAllForums = (request, response) => {
    models.forum.findAll({
        include : [
            models.conversation
        ]
    }).then(result =>{
        return response.status(200).json(result);
    })
};