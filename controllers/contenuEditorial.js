const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Contenu = sequelize.import('../models/T_E_CONTENU_EDITORIAL_EDI');

exports.getContenus = (req, res, next) => {
    Contenu.findAll()
    .then(contenus => {
        res.status(200).json({contenu: contenus});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getContenu = (req, res, next) => {
    const contenuId = req.params.contenuId;
    Contenu.findByPk(contenuId)
    .then(contenu => {
        if (!contenu) {
            const error = new Error('Contenu inexistante !');
            error.statusCode = 404;
            throw error;
        }
            res.status(200).json({contenu: contenu});
        })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
 
};

exports.createContenu = (req, res, next) => {
    const description = req.body.EDI_DESCRIPTION;
    const contenu = req.body.EDI_CONTENU;
    const cetId = req.body.CET_ID;

    Contenu.create({
        EDI_DESCRIPTION: description,
        EDI_CONTENU: contenu,
        CET_ID: cetId

    })
    .then(result => {
        res.status(201).json({
            message: 'Contenu créee'                                 
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



exports.deleteContenu = (req, res, next) => {
    const contenuId = req.params.contenuId;
    Contenu.findByPk(contenuId)
        .then(contenu => {
            if (!contenu) {
                const error = new Error('Contenu inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return contenu.destroy();
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

exports.updateContenu = (req, res, next) => {
    const contenuId = req.params.contenuId;
    const description = req.body.EDI_DESCRIPTION;
    const contenuEdi = req.body.EDI_CONTENU;
    const cetId = req.body.CET_ID;
    Contenu.findByPk(contenuId)
    .then(contenu => {
        if (!contenu) {
            const error = new Error('Contenu inexistant !');
            error.statusCode = 404;
            throw error;
        }        
        contenu.EDI_DESCRIPTION = description;
        contenu.EDI_CONTENU = contenuEdi;
        contenu.CET_ID = cetId;
        return contenu.save();     
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

