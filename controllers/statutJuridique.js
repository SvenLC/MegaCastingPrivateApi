const sequelize = require('../util/database');

const StatutJuridique = sequelize.import('../models/T_R_STATUT_JURIDIQUE_JUR');

exports.getStatutJuridiques = (req, res, next) => {
    StatutJuridique.findAll()
        .then(statutJuridiques => {
            res.status(200).json({ StatutJuridique: statutJuridiques });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getStatutJuridique = (req, res, next) => {
    const statutJuridiqueId = req.params.statutJuridiqueId;
    StatutJuridique.findByPk(statutJuridiqueId)
        .then(statutJuridique => {
            if (!statutJuridique) {
                const error = new Error({ message: 'Statut juridique inexistant !' });
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ statutJuridique: statutJuridique });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createStatutJuridique = (req, res, next) => {
    const libelle = req.body.JUR_LIBELLE;


    StatutJuridique.create({
        JUR_LIBELLE: libelle,

    })
        .then(statutJuridique => {
            res.status(201).json({statutJuridique: statutJuridique})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log('Failed to create');
        });
}



exports.deleteStatutJuridique = (req, res, next) => {
    const statutJuridiqueId = req.params.statutJuridiqueId;
    StatutJuridique.findByPk(statutJuridiqueId)
        .then(statutJuridique => {
            if (!statutJuridique) {
                const error = new Error({ message: 'Statut juridique inexistant !' });
                error.statusCode = 404;
                throw error;
            }
            return statutJuridique.destroy();
        }).then(statutJuridique => {
            res.status(200).json({statutJuridique: statutJuridique});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateStatutJuridique = (req, res, next) => {
    const statutJuridiqueId = req.params.statutJuridiqueId;
    const libelle = req.body.MET_LIBELLE;

    StatutJuridique.findByPk(statutJuridiqueId)
        .then(statutJuridique => {
            if (!statutJuridique) {
                const error = new Error({ message: 'Statut juridique inexistant !' });
                error.statusCode = 404;
                throw error;
            }

            statutJuridique.JUR_LIBELLE = libelle;
            return statutJuridique.save();
        }).then(statutJuridique => {
            res.status(200).json({statutJuridique: statutJuridique});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

