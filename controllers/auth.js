const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.import('../models/T_S_UTILISATEUR_UTI');

exports.login = (req, res, next) => {
    const login = req.body.UTI_LOGIN;
    const password = req.body.UTI_MDP;
    let loadedUser;

    User.findOne({UTI_LOGIN: login})
    .then(user => {
        if(!user) {
            const error = new error('Aucun utilisateur avec ce login n\'a été trouvé');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);

    });
};