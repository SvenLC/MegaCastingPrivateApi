const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Contenu = sequelize.import('../models/T_E_ADRESSE_ADR');

exports.getAdresses = (req, res, next) => {
    Contenu.findAll()
    .then(adresses => {
        res.status(200).json({adresse: adresses});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getAdresse = (req, res, next) => {
    const adresseId = req.params.adresseId;
    Contenu.findByPk(adresseId)
    .then(adresse => {
        if (!adresse) {
            const error = new Error('Contenu inexistante !');
            error.statusCode = 404;
            throw error;
        }
            res.status(200).json({adresse: adresse});
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.createAdresse = (req, res, next) => {
    const voie = req.body.ADR_NUM_VOIE;
    const rue = req.body.ADR_LIBELLE_RUE;
    const ville = req.body.ADR_VILLE;

    Contenu.create({
        ADR_NUM_VOIE: voie,
        ADR_LIBELLE_RUE: rue,
        ADR_VILLE: ville

    })
    .then(result => {
        res.status(201).json({
            message: 'Contenu créee',
            voie: voie,
            rue: rue,
            ville: ville                       
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

exports.deleteAdresse = (req, res, next) => {
    const adresseId = req.params.adresseId;
    Contenu.findByPk(adresseId)
        .then(adresse => {
            if (!adresse) {
                const error = new Error('Contenu inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return adresse.destroy();
        }).then(result => {            
            res.status(200).json({message: 'Contenu supprimé'});
            
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateAdresse = (req, res, next) => {
    const adresseId = req.params.adresseId;
    const voie = req.body.ADR_NUM_VOIE;
    const rue = req.body.ADR_LIBELLE_RUE;
    const ville = req.body.ADR_VILLE;
    Contenu.findByPk(adresseId)
    .then(adresse => {
        if (!adresse) {
            const error = new Error('Contenu inexistant !');
            error.statusCode = 404;
            throw error;
        }        
        adresse.ADR_NUM_VOIE = voie;
        adresse.ADR_LIBELLE_RUE = rue;
        adresse.ADR_VILLE = ville;
        return adresse.save();     
    }).then(result => {            
        res.status(200).json({message: 'Contenu modifié'});
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

