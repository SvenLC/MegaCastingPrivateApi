const sequelize = require('../util/database');

const CodePostal = sequelize.import('../models/T_X_CODE_POSTAL_CPT');

exports.getCodePostals = (req, res, next) => {
    CodePostal.findAll()
        .then(codePostals => {
            res.status(200).json(codePostals);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getCodePostal = (req, res, next) => {
    const commune = req.params.commune;
    CodePostal.findAll({ where: { CPT_COMMUNE: commune } })
        .then(codePostals => {
            if (!codePostals) {
                const error = new Error('Commune inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({codePostals: codePostals});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};