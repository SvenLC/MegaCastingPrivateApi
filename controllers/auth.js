const Sequelize = require('sequelize');

const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

const sequelize = require('../util/database');


const Utilisateur = sequelize.import('../models/T_S_UTILISATEUR_UTI');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const errors = new Error('Validation failed.')
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const nom = req.body.UTI_NOM;
    const prenom = req.body.UTI_PRENOM;
    const login = req.body.UTI_LOGIN;
    const mdp = req.body.UTI_MDP;
    const admin = req.body.UTI_ADMINISTRATEUR;
    
    bcrypt.hash(mdp, 12)
    .then(hashedPw => {
        Utilisateur.create({
            UTI_NOM: nom,
            UTI_PRENOM: prenom,
            UTI_LOGIN: login,
            UTI_MDP: hashedPw,     
            UTI_ADMINISTRATEUR: admin     
        });
    })
    .then(result => {
        res.status(201).json({message: 'Utilisateur crée'});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

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

