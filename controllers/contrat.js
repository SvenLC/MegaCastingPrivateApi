const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Contrat = sequelize.import('../models/T_R_CONTRAT_CON');

exports.getContrats= (req, res, next) => {
    Contrat.findAll()
    .then(contrat => {
        res.status(200).json({contrat: contrat});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getContrat = (req, res, next) => {
    const contratId = req.params.contratId;
    Contrat.findByPk(contratId)
    .then(contrat => {
        if (!contrat) {
            const error = new Error('contrat inexistante !');
            error.statusCode = 404;
            throw error;
        }
            res.status(200).json({contrat: contrat});
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.createContrat = (req, res, next) => {
    const libelle = req.body.CON_LIBELLE;

    Contrat.create({
        CON_LIBELLE: libelle

    })
    .then(result => {
        res.status(201).json({
            message: 'contrat créee'                                 
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


exports.deleteContrat = (req, res, next) => {
    const contratId = req.params.contratId;
    Contrat.findByPk(contratId)
        .then(contrat => {
            if (!contrat) {
                const error = new Error('contrat inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return contrat.destroy();
        }).then(result => {            
            res.status(200).json({message: 'contrat supprimé'});
            
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateContrat = (req, res, next) => {
    const contratId = req.params.contratId;
    const libelle = req.body.CON_LIBELLE;   

    Contrat.findByPk(contratId)
    .then(contrat => {
        if (!contrat) {
            const error = new Error('contrat inexistant !');
            error.statusCode = 404;
            throw error;
        }

        contrat.CON_LIBELLE = libelle;
        return contrat.save();     
    }).then(result => {            
        res.status(200).json({message: 'contrat modifié'});
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

