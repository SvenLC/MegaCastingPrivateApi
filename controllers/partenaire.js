const sequelize = require('../util/database');

const Partenaire = sequelize.import('../models/T_H_PARTENAIRES_PAR');
const Prospect = sequelize.import('../models/T_E_PROSPECT_PRO');

exports.getPartenaires = (req, res, next) => {
    Partenaire.findAll()
        .then(partenaires => {
            res.status(200).json({
                partenaires: partenaires
            });
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
                const error = new Error({
                    message: 'partenaire inexistant !'
                });
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                partenaire: partenaire
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.getPartenaireByLogin = (req, res, next) => {
    const login = req.params.partenaireLogin;

    Partenaire.findOne({
            where: {
                PAR_LOGIN: login
            }
        })
        .then(partenaire => {
            if (!partenaire) {
                const error = new Error('Aucun partenaire trouvé');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(partenaire);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.createPartenaire = async (req, res, next) => {
    const proId = req.body.PRO_ID;
    const login = req.body.PAR_LOGIN;
    const mdp = req.body.PAR_MDP;
    let loadedProspect;

    try {
        await Prospect.findByPk(proId)
            .then(prospect => {
                if (!prospect) {
                    const error = new Error('Aucun prospect ne correspond');
                    error.statusCode = 404;
                    throw error;
                }
                loadedProspect = prospect;
            })
    } catch (error) {
        next(error);
    }

    try {
        await Partenaire.findByPk(proId)
            .then(partenaire => {
                if (partenaire) {
                    const error = new Error('Un partenaire correspond déjà à cette Id');
                    error.statusCode = 400;
                    throw error;
                }
            })
    } catch (error) {
        next(error);
    }
    try {
        await Partenaire.findAll({
                where: {
                    PAR_LOGIN: '\'' + login + '\''
                }
            })
            .then(user => {
                if (user) {
                    const error = new Error(`Le login ${login} est déjà attribué`);
                    error.statusCode = 400;
                    throw error;
                }
            })
    } catch (error) {

    }
    try {
        await Partenaire.create({
                PRO_ID: loadedProspect.PRO_ID,
                PAR_LOGIN: login,
                PAR_MDP: mdp
            })

            .then(partenaire => {
                res.status(201).json({
                    partenaire: partenaire
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }

            });
    } catch (error) {
        next(error);
    }

}



exports.deletePartenaire = (req, res, next) => {
    const partenaireId = req.params.partenaireId;
    Partenaire.findByPk(partenaireId)
        .then(partenaire => {
            if (!partenaire) {
                const error = new Error({
                    message: 'partenaire inexistant !'
                });
                error.statusCode = 404;
                throw error;
            }
            return partenaire.destroy();
        }).then(partenaire => {
            res.status(200).json({
                partenaire: partenaire
            });

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
                const error = new Error({
                    message: 'partenaire inexistant !'
                });
                error.statusCode = 404;
                throw error;
            }

            partenaire.PAR_LOGIN = login;
            partenaire.PAR_MDP = mdp;
            return partenaire.save();
        }).then(partenaire => {
            res.status(200).json({
                partenaire: partenaire
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}