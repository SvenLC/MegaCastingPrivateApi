const sequelize = require('../util/database');

const CodePostal = sequelize.import('../models/T_X_CODE_POSTAL_CPT');

exports.getCodePostals= (req, res, next) => {
    CodePostal.findAll()
        .then(codePostals => {
            res.status(200).json({
                message: 'Code postal trouvé',
                CodePostal: codePostals
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getCodePostal= (req, res, next) => {
    const codePostalId = req.params.codePostalId;
    CodePostal.findByPk(codePostalId)
        .then(codePostal => {
            if (!codePostal) {
                const error = new Error('CodePostal inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Code postal trouvé',
                codePostal: codePostal
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};