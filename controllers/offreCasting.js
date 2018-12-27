const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Offre = sequelize.import('../models/T_E_OFFRE_CASTING_CAST');

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

exports.getOffres = (req, res, next) => {
    Offre.findAll()
        .then(offres => {
            res.status(200).json({
                Offre: offres
            });
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
                const error = new Error('Offre inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Offre de castinf trouvé',
                offre: offre
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createOffre = (req, res, next) => {
    const intitule = req.body.CAST_INTITULE;
    const reference = req.body.CAST_REFERENCE;
    const dateDebutPublication = req.body.CAST_DATE_DEBUT_PUBLICATION;
    const dureeDiffusion = req.body.CAST_DUREE_DIFFUSION;
    const dateDebutContrat = req.body.CAST_DATE_DEBUT_CONTRAT;
    const nombrePostes = req.body.CAST_NBR_POSTE;
    const descriptionPoste = req.body.CAST_DESCRIPTION_POSTE;
    const descriptionProfil = req.body.CAST_DESCRIPTION_PROFIL;
    const prospectId = req.body.PRO_ID;
    const metierId = req.body.MET_ID;

    Offre.create({
        CAST_INTITULE: intitule,
        CAST_REFERENCE: reference,
        CAST_DATE_DEBUT_PUBLICATION: dateDebutPublication,
        CAST_DUREE_DIFFUSION: dureeDiffusion,
        CAST_DATE_DEBUT_CONTRAT: dateDebutContrat,
        CAST_NBR_POSTE: nombrePostes,
        CAST_DESCRIPTION_POSTE: descriptionPoste,
        CAST_DESCRIPTION_PROFIL: descriptionProfil,
        PRO_ID: prospectId,
        MET_ID: metierId
    })
        .then(offre => {
            res.status(201).json({
                message: 'Offre créee',
                offre: offre
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
            res.status(200).json({
                message: 'Offre supprimé',
                Offre: offre
            });

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
    const intitule = req.body.CAST_INTITULE;
    const reference = req.body.CAST_REFERENCE;
    const dateDebutPublication = req.body.CAST_DATE_DEBUT_PUBLICATION;
    const dureeDiffusion = req.body.CAST_DUREE_DIFFUSION;
    const dateDebutContrat = req.body.CAST_DATE_DEBUT_CONTRAT;
    const nombrePostes = req.body.CAST_NBR_POSTE;
    const descriptionPoste = req.body.CAST_DESCRIPTION_POSTE;
    const descriptionProfil = req.body.CAST_DESCRIPTION_PROFIL;
    const prospectId = req.body.PRO_ID;
    const metierId = req.body.MET_ID;

    Offre.findByPk(offreId)
        .then(offre => {
            if (!offre) {
                const error = new Error({
                    message: 'Offre inexistante !'
                });
                error.statusCode = 404;
                throw error;
            }

            offre.CAST_INTITULE = intitule;
            offre.CAST_REFERENCE = reference;
            offre.CAST_DATE_DEBUT_PUBLICATION = dateDebutPublication;
            offre.CAST_DUREE_DIFFUSION = dureeDiffusion;
            offre.CAST_DATE_DEBUT_CONTRAT = dateDebutContrat;
            offre.CAST_NBR_POSTE = nombrePostes;
            offre.CAST_DESCRIPTION_POSTE = descriptionPoste;
            offre.CAST_DESCRIPTION_PROFIL = descriptionProfil;
            offre.PRO_ID = prospectId;
            offre.MET_ID = metierId;
            return offre.save();
        }).then(offre => {
            res.status(200).json({
                message: 'Offre modifié',
                Offre: offre
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}