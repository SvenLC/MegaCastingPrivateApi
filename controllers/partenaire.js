const sequelize = require('../util/database');

const Partenaire = sequelize.import('../models/T_H_PARTENAIRES_PAR');
const Prospect = sequelize.import('../models/T_E_PROSPECT_PRO');

exports.getPartenaires = (req, res, next) => {
    Partenaire.findAll()
        .then(partenaires => {
            res.status(200).json({partenaires: partenaires});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getPartenaire = (req, res, next) => {
    const partenaireId = req.params.partenaireId;
    Partenaire.findByPk(partenaireId)
        .then(partenaire => {
            if (!partenaire) {
                const error = new Error({ message: 'partenaire inexistant !' });
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({partenaire: partenaire});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createPartenaire = (req, res, next) => {
    const proId = req.body.PRO_ID;
    const login = req.body.PAR_LOGIN;
    const mdp = req.body.PAR_MDP;

    Prospect.findByPk(proId)
        .then(prospect => {
            if (!prospect) {
                const error = new Error('Aucun prospect ne correspond');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(prospect => {
            Partenaire.create({
                PRO_ID: prospect.PRO_ID,
                PAR_LOGIN: login,
                PAR_MDP: mdp
            })
        })
        .then(partenaire => {
            res.status(201).json({partenaire: partenaire});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);            
        });
}



exports.deletePartenaire = (req, res, next) => {
    const partenaireId = req.params.partenaireId;
    Partenaire.findByPk(partenaireId)
        .then(partenaire => {
            if (!partenaire) {
                const error = new Error({ message: 'partenaire inexistant !' });
                error.statusCode = 404;
                throw error;
            }
            return partenaire.destroy();
        }).then(partenaire => {
            res.status(200).json({partenaire: partenaire});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updatePartenaire = (req, res, next) => {
    const partenaireId = req.params.partenaireId;
    const login = req.body.PAR_LOGIN;
    const mdp = req.body.PAR_MDP;

    Partenaire.findByPk(partenaireId)
        .then(partenaire => {
            if (!partenaire) {
                const error = new Error({ message: 'partenaire inexistant !' });
                error.statusCode = 404;
                throw error;
            }

            partenaire.PAR_LOGIN = login;
            partenaire.PAR_MDP = mdp;
            return partenaire.save();
        }).then(partenaire => {
            res.status(200).json({partenaire: partenaire});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

