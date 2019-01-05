const algoliasearch = require('algoliasearch');
var client = algoliasearch('9FGBZNOUZ3', 'e00fde5f047c249d84f191b29efd7cd5');
var index = client.initIndex('offreCastingsFormated');

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Offre = sequelize.import('../models/T_E_OFFRE_CASTING_CAST');

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

exports.getOffres = (req, res, next) => {
    Offre.findAll({

    })
        .then(offres => {
            res.status(200).json({
                Offres: offres
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getFormatedOffres = (req, res, next) => {
    sequelize.query(`SELECT
        CAST_ID, 
        CAST_INTITULE,  
        CAST_REFERENCE,  
        CAST_DATE_DEBUT_PUBLICATION,  
        CAST_DUREE_DIFFUSION,  
        CAST_DATE_DEBUT_CONTRAT,  
        CAST_NBR_POSTE,  
        CAST_DESCRIPTION_POSTE,  
        CAST_DESCRIPTION_PROFIL,  
        PRO_NAME,  
        CTC_NUM_TEL,  
        CTC_NUM_FAX,  
        CTC_EMAIL,  
        MET_LIBELLE,  
        DOM_LIBELLE,  
        LOC_LIBELLE,  
        CON_LIBELLE  
        FROM T_E_OFFRE_CASTING_CAST as cas  
        INNER JOIN T_E_PROSPECT_PRO as pro ON cas.PRO_ID = pro.PRO_ID  
        INNER JOIN T_E_CONTACT_CTC as ctc ON cas.CTC_ID = ctc.CTC_ID  
        INNER JOIN T_R_METIER_MET as met ON cas.MET_ID = met.MET_ID  
        INNER JOIN T_R_DOMAINE_METIER_DOM as dom ON met.DOM_ID = dom.DOM_ID  
        INNER JOIN T_R_LOCALISATION_LOC as loc ON cas.LOC_ID = loc.LOC_ID  
        INNER JOIN T_R_CONTRAT_CON as con on cas.CON_ID= con.CON_ID`
        , { model: Offre })
        .then(offres => {
            res.status(200).json(offres);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getFormatedOffresById = (req, res, next) => {       
    const {offreId} = req.params;
    sequelize.query(`SELECT 
        CAST_ID, 
        CAST_INTITULE,
        CAST_REFERENCE,  
        CAST_DATE_DEBUT_PUBLICATION,  
        CAST_DUREE_DIFFUSION,  
        CAST_DATE_DEBUT_CONTRAT,  
        CAST_NBR_POSTE,  
        CAST_DESCRIPTION_POSTE,  
        CAST_DESCRIPTION_PROFIL,  
        PRO_NAME,  
        CTC_NUM_TEL,  
        CTC_NUM_FAX,  
        CTC_EMAIL,  
        MET_LIBELLE,  
        DOM_LIBELLE,  
        LOC_LIBELLE,  
        CON_LIBELLE  
        FROM T_E_OFFRE_CASTING_CAST as cas  
        INNER JOIN T_E_PROSPECT_PRO as pro ON cas.PRO_ID = pro.PRO_ID  
        INNER JOIN T_E_CONTACT_CTC as ctc ON cas.CTC_ID = ctc.CTC_ID  
        INNER JOIN T_R_METIER_MET as met ON cas.MET_ID = met.MET_ID  
        INNER JOIN T_R_DOMAINE_METIER_DOM as dom ON met.DOM_ID = dom.DOM_ID  
        INNER JOIN T_R_LOCALISATION_LOC as loc ON cas.LOC_ID = loc.LOC_ID  
        INNER JOIN T_R_CONTRAT_CON as con on cas.CON_ID = con.CON_ID
        WHERE CAST_ID = ${offreId}`,        
        { model: Offre })        
        .then(result => {            
            if (!result[0]) {                
                const error = new Error('Offre inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(result[0]);       
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
                message: 'Offre de casting trouvée',
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
    const contactId = req.body.CTC_ID;
    const localisationId = req.body.LOC_ID;
    const contratId = req.body.CON_ID;
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
        MET_ID: metierId,
        CTC_ID: contactId,
        LOC_ID: localisationId,
        CON_ID: contratId
    })
        .then(offre => {
            const object = getFormatedOffresById(offre.CAST_ID); 
            index.addObject(object, function(err, content) {
                console.log(content);
              });     
            res.status(201).json({
                message: 'Offre créee',
                offre: offre,
                
            })
        })        
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);            
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
    const contactId = req.body.CTC_ID;
    const localisationId = req.body.LOC_ID;
    const contratId = req.body.CON_ID;

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
            offre.CTC_ID = contactId;
            offre.LOC_ID = localisationId;
            offre.CON_ID = contratId;
            return offre.save();
        }).then(offre => {
            index.partialUpdateObject(offre, function(err, content) {
                if (err) throw err;
              
                console.log(content);
              });
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