const Sequelize = require('sequelize');

const sequelize = require('../util/database');

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
            res.status(200).json({message: 'Utilisateur trouvé', utilisateur: utilisateur});
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.getUtilisateurs = (req, res, next) => {
    Utilisateur.findAll()
    .then(utilisateurs => {
        res.status(200).json({message: 'Utilisateurs touvé', utilisateurs: utilisateurs});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}