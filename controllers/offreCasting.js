const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Offre = sequelize.import('../models/T_E_OFFRE_CASTING_CAST');

exports.getOffres= (req, res, next) => {
    Offre.findAll()
    .then(offres => {
        res.status(200).json({Offre: offres});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getOffre = (req, res, next) => {
    const offreId = req.params.offreId;
    Offre.findByPk(offreId)
    .then(offre => {
        if (!offre) {
            const error = new Error({message: 'Offre inexistante !'});
            error.statusCode = 404;
            throw error;
        }
            res.status(200).json({offre : offre });
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.createOffre = (req, res, next) => {
    const libelle = req.body.LOC_LIBELLE;

    Offre.create({
        LOC_LIBELLE: libelle

    })
    .then(offre => {
        res.status(201).json({message: 'Offre créee', Offre: offre})        
      })
      .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        console.log('Failed to create');
      });
}



exports.deleteOffre = (req, res, next) => {
    const offreId = req.params.offreId;
    Offre.findByPk(offreId)
        .then(offre => {
            if (!offre) {
                const error = new Error('Offre inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return offre.destroy();
        }).then(result => {            
            res.status(200).json({message: 'Offre supprimé', Offre: offre});
            
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateOffre = (req, res, next) => {
    const offreId = req.params.offreId;
    const libelle = req.body.LOC_LIBELLE;   

    Offre.findByPk(offreId)
    .then(offre => {
        if (!offre) {
            const error = new Error({message: 'Localisaton inexistante !'});
            error.statusCode = 404;
            throw error;
        }

        offre.LOC_LIBELLE = libelle;
        return offre.save();     
    }).then(offre => {            
        res.status(200).json({message: 'Offre modifié', Offre: offre});
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

