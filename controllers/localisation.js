const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Localisation = sequelize.import('../models/T_R_LOCALISATION_LOC');

exports.getLocalisations = (req, res, next) => {
    Localisation.findAll()
        .then(localisations => {
            res.status(200).json({
                message: 'Localisation trouvé',
                Localisation: localisations
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getLocalisation = (req, res, next) => {
    const localisationId = req.params.localisationId;
    Localisation.findByPk(localisationId)
        .then(localisation => {
            if (!localisation) {
                const error = new Error('Localisation inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'localisation trouvé',
                localisation: localisation
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createLocalisation = (req, res, next) => {
    const libelle = req.body.LOC_LIBELLE;

    Localisation.create({
            LOC_LIBELLE: libelle

        })
        .then(localisation => {
            res.status(201).json({
                message: 'Localisation créee',
                Localisation: localisation
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log('Failed to create');
        });
}



exports.deleteLocalisation = (req, res, next) => {
    const localisationId = req.params.localisationId;
    Localisation.findByPk(localisationId)
        .then(localisation => {
            if (!localisation) {
                const error = new Error('Localisation inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return localisation.destroy();
        }).then(result => {
            res.status(200).json({
                message: 'Localisation supprimé',
                Localisation: localisation
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateLocalisation = (req, res, next) => {
    const localisationId = req.params.localisationId;
    const libelle = req.body.LOC_LIBELLE;

    Localisation.findByPk(localisationId)
        .then(localisation => {
            if (!localisation) {
                const error = new Error({
                    message: 'Localisaton inexistante !'
                });
                error.statusCode = 404;
                throw error;
            }

            localisation.LOC_LIBELLE = libelle;
            return localisation.save();
        }).then(localisation => {
            res.status(200).json({
                message: 'Localisation modifié',
                Localisation: localisation
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}