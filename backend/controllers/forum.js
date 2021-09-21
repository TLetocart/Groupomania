const models = require('../models/index.js');

exports.getAllForums = (request, response) => {
    models.forum.findAll({
        include : [
            {
                model: models.conversation, 
                include: [
                    {model: models.message}, 
                    {model: models.user, attributes: { exclude: ['password']}}
                ],
            }
        ]
    }).then(result =>{
        return response.status(200).json(result);
    })
};