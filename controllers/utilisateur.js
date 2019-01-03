const sequelize = require('../util/database');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const Utilisateur = sequelize.import('../models/T_S_UTILISATEUR_UTI');

exports.getUtilisateur = (req, res, next) => {
    const utilisateurId = req.params.utilisateurId;
    Utilisateur.findByPk(utilisateurId)
        .then(utilisateur => {
            if (!utilisateur) {
                const error = new Error('Utilisateur inexistant !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Utilisateur trouvé',
                UTI_ID: utilisateur.UTI_ID,
                UTI_NOM: utilisateur.UTI_NOM,
                UTI_PRENOM: utilisateur.UTI_PRENOM,
                UTI_LOGIN: utilisateur.UTI_LOGIN,
                UTI_ADMINISTRATEUR: utilisateur.UTI_ADMINISTRATEUR
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.getUtilisateurs = (req, res, next) => {
    Utilisateur.findAll({
        attributes: ['UTI_ID', 'UTI_NOM', 'UTI_PRENOM', 'UTI_LOGIN', 'UTI_ADMINISTRATEUR']
    })
        .then(utilisateurs => {
            res.status(200).json({
                message: 'Utilisateurs touvé',
                utilisateurs: utilisateurs
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createUtilisateur = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
            })
                .then(utilisateur => {
                    res.status(201).json({
                        message: 'Utilisateur crée',
                        UTI_ID: utilisateur.UTI_ID,
                        UTI_NOM: utilisateur.UTI_NOM,
                        UTI_PRENOM: utilisateur.UTI_PRENOM,
                        UTI_LOGIN: utilisateur.UTI_LOGIN,
                        UTI_ADMINISTRATEUR: utilisateur.UTI_ADMINISTRATEUR
                    });
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteUtilisateur = (req, res, next) => {
    const utilisateurId = req.params.utilisateurId;
    Utilisateur.findByPk(utilisateurId)
        .then(utilisateur => {
            if (!utilisateur) {
                const error = new Error('Utilisateur inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return utilisateur.destroy();
        }).then(utilisateur => {
            res.status(200).json({
                message: 'Utilisateur supprimé',
                UTI_ID: utilisateur.UTI_ID,
                UTI_NOM: utilisateur.UTI_NOM,
                UTI_PRENOM: utilisateur.UTI_PRENOM,
                UTI_LOGIN: utilisateur.UTI_LOGIN,
                UTI_ADMINISTRATEUR: utilisateur.UTI_ADMINISTRATEUR
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateUtilisateur = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errors = new Error('Validation failed.')
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const utilisateurId = req.params.utilisateurId;
    const nom = req.body.UTI_NOM;
    const prenom = req.body.UTI_PRENOM;
    const login = req.body.UTI_LOGIN;
    const mdp = req.body.UTI_MDP;
    const admin = req.body.UTI_ADMINISTRATEUR;
    bcrypt.hash(mdp, 12)
        .then(hashedPw => {
            Utilisateur.findByPk(utilisateurId)
                .then(utilisateur => {
                    if (!utilisateur) {
                        const error = new Error('Utilisateur inexistant !');
                        error.statusCode = 404;
                        throw error;
                    }
                    utilisateur.UTI_NOM = nom;
                    utilisateur.UTI_PRENOM = prenom;
                    utilisateur.UTI_LOGIN = login;
                    utilisateur.UTI_MDP = hashedPw;
                    utilisateur.UTI_ADMINISTRATEUR = admin;
                    return utilisateur.save();
                })
                .then(utilisateur => {
                    res.status(200).json({
                        message: 'Utilisateur modifié',
                        //UTI_ID: utilisateur.UTI_ID,
                        UTI_NOM: utilisateur.UTI_NOM,
                        UTI_PRENOM: utilisateur.UTI_PRENOM,
                        UTI_LOGIN: utilisateur.UTI_LOGIN,
                        UTI_ADMINISTRATEUR: utilisateur.UTI_ADMINISTRATEUR
                    });
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}


