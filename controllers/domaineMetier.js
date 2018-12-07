const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const DomaineMetier = sequelize.import('../models/T_R_DOMAINE_METIER_DOM');

exports.getDomaineMetiers= (req, res, next) => {
    DomaineMetier.findAll()
    .then(domaineMetiers => {
        res.status(200).json({DomaineMetier: domaineMetiers});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getDomaineMetier = (req, res, next) => {
    const domaineMetierId = req.params.domaineMetierId;
    DomaineMetier.findByPk(domaineMetierId)
    .then(domaineMetier => {
        if (!domaineMetier) {
            const error = new Error('Domaine métier inexistant !');
            error.statusCode = 404;
            throw error;
        }
            res.status(200).json({DomaineMetier : domaineMetier });
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.createDomaineMetier = (req, res, next) => {
    const libelle = req.body.DOM_LIBELLE;

    DomaineMetier.create({
        DOM_LIBELLE: libelle

    })
    .then(result => {
        res.status(201).json({
            message: 'Domaine métier crée'                                 
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



exports.deleteDomaineMetier = (req, res, next) => {
    const domaineMetierId = req.params.domaineMetierId;
    DomaineMetier.findByPk(domaineMetierId)
        .then(domaineMetier => {
            if (!domaineMetier) {
                const error = new Error('Domaine métier inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return domaineMetier.destroy();
        }).then(result => {            
            res.status(200).json({message: 'Type de contenu supprimé'});
            
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateDomaineMetier = (req, res, next) => {
    const domaineMetierId = req.params.domaineMetierId;
    const libelle = req.body.DOM_LIBELLE;   

    DomaineMetier.findByPk(domaineMetierId)
    .then(domaineMetier => {
        if (!domaineMetier) {
            const error = new Error('Domaine métier inexistant !');
            error.statusCode = 404;
            throw error;
        }

        domaineMetier.DOM_LIBELLE = libelle;
        return domaineMetier.save();     
    }).then(result => {            
        res.status(200).json({message: 'Domaine métier modifié'});
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

