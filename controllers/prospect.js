const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Prospect = sequelize.import('../models/T_E_PROSPECT_PRO');


exports.getProspect = (req, res, next) => {
    const prospectId = req.params.prospectId;
    Prospect.findByPk(prospectId)
    .then(prospect => {
        if (!prospect) {
            const error = new Error('Prospect inexistant !');
            error.statusCode = 404;
            throw error;
        }
            res.status(200).json({message: 'Prospect trouvé', prospect: prospect});
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.getProspects = (req, res, next) => {
    Prospect.findAll()
    .then(prospects => {
        res.status(200).json({message: 'Prospects trouvé', prospects: prospects});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

