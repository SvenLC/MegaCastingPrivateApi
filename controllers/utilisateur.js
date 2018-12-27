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
            res.status(200).json({ message: 'Utilisateur trouvé', utilisateur: utilisateur });
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
            res.status(200).json({ message: 'Utilisateurs touvé', utilisateurs: utilisateurs });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createUtilisateur = (req, res, next) => {
    const nom = req.body.UTI_NOM;
    const prenom = req.body.UTI_PRENOM;
    const login = req.body.UTI_LOGIN;
    const mdp = req.body.UTI_MDP;
    const admin = req.body.UTI_ADMINISTRATEUR;
    Utilisateur.create({
        UTI_NOM: nom,
        UTI_PRENOM: prenom,
        UTI_LOGIN: login,
        UTI_MDP: mdp,
        UTI_ADMINISTRATEUR: admin
    })
        .then(result => {
            res.status(201).json({
                message: 'Utilisateur crée',
                id: result.UTI_ID,
                nom: nom,
                prenom: prenom,
                login: login
            })
        })
        .catch(err => {
            console.log(err);
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
        }).then(result => {
            res.status(200).json({ message: 'Utilisateur supprimé' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateUtilisateur = (req, res, next) => {
    const utilisateurId = req.params.utilisateurId;
    const nom = req.body.UTI_NOM;
    const prenom = req.body.UTI_PRENOM;
    const login = req.body.UTI_LOGIN;
    const mdp = req.body.UTI_MDP;
    const admin = req.body.UTI_ADMINISTRATEUR;
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
            utilisateur.UTI_MDP = mdp;
            utilisateur.UTI_ADMINISTRATEUR = admin;
            return utilisateur.save();
        }).then(result => {
            res.status(200).json({
                message: 'Utilisateur modifié',
                nom: nom,
                prenom: prenom,
                login: login
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}


