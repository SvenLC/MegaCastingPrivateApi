const sequelize = require('../util/database');

const Prospect = sequelize.import('../models/T_E_PROSPECT_PRO');

exports.getProspects = (req, res, next) => {
    Prospect.findAll()
        .then(prospects => {
            res.status(200).json({
                message: 'Prospects trouvé',
                prospects: prospects
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getProspect = (req, res, next) => {
    const prospectId = req.params.prospectId;
    Prospect.findByPk(prospectId)
        .then(prospect => {
            if (!prospect) {
                const error = new Error('Prospect inexistant !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Prospect trouvé',
                prospect: prospect
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createProspect = (req, res, next) => {
    const nom = req.body.PRO_NAME;

    Prospect.create({
        PRO_NAME: nom
    })
        .then(prospect => {
            res.status(201).json({
                message: 'Prospect crée',
                prospect: prospect
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

exports.deleteProspect = (req, res, next) => {
    const prospectId = req.params.prospectId;
    Prospect.findByPk(prospectId)
        .then(prospect => {
            if (!prospect) {
                const error = new Error('Prospect inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return prospect.destroy();
        }).then(prospect => {
            res.status(200).json({
                message: 'Prospect supprimé',
                prospect: prospect
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateProspect = (req, res, next) => {
    const prospectId = req.params.prospectId;
    const nom = req.body.PRO_NAME;
    Prospect.findByPk(prospectId)
        .then(prospect => {
            if (!prospect) {
                const error = new Error('Prospect inexistant !');
                error.statusCode = 404;
                throw error;
            }
            prospect.PRO_NAME = nom;
            return prospect.save();
        }).then(prospect => {
            res.status(200).json({
                message: 'Prospect modifié',
                prospect: prospect
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}