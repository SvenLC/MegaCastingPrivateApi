const sequelize = require('../util/database');

const Metier = sequelize.import('../models/T_R_METIER_MET');

exports.getMetiers = (req, res, next) => {
    Metier.findAll()
        .then(metiers => {
            res.status(200).json({ metier: metiers });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getMetier = (req, res, next) => {
    const metierId = req.params.metierId;
    Metier.findByPk(metierId)
        .then(metier => {
            if (!metier) {
                const error = new Error({ message: 'Métier inexistant !' });
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ Metier: metier });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createMetier = (req, res, next) => {
    const libelle = req.body.MET_LIBELLE;
    const domId = req.body.DOM_ID;

    Metier.create({
        MET_LIBELLE: libelle,
        DOM_ID: domId

    })
        .then(metier => {
            res.status(201).json({metier: metier})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log('Failed to create');
        });
}



exports.deleteMetier = (req, res, next) => {
    const metierId = req.params.metierId;
    Metier.findByPk(metierId)
        .then(metier => {
            if (!metier) {
                const error = new Error({ message: 'Métier inexistant !' });
                error.statusCode = 404;
                throw error;
            }
            return metier.destroy();
        }).then(metier => {
            res.status(200).json({metier: metier});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateMetier = (req, res, next) => {
    const metierId = req.params.metierId;
    const libelle = req.body.MET_LIBELLE;

    Metier.findByPk(metierId)
        .then(metier => {
            if (!metier) {
                const error = new Error({ message: 'Métier inexistant !' });
                error.statusCode = 404;
                throw error;
            }

            metier.MET_LIBELLE = libelle;
            return metier.save();
        }).then(metier => {
            res.status(200).json({metier: metier});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

