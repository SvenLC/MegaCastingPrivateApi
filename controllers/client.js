const sequelize = require('../util/database');

const Client = sequelize.import('../models/T_H_CLIENT_CLI');
const Prospect = sequelize.import('../models/T_E_PROSPECT_PRO');

exports.getClients = (req, res, next) => {
    Client.findAll()
        .then(clients => {
            res.status(200).json({
                clients: clients
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getClient = (req, res, next) => {
    const clientId = req.params.clientId;
    Client.findByPk(clientId)
        .then(client => {
            if (!client) {
                const error = new Error(
                    'Client inexistant !'
                );
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                client: client
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createClient = (req, res, next) => {
    const proId = req.body.PRO_ID;
    const siret = req.body.CLI_SIRET;
    const rna = req.body.CLI_RNA;
    const jurId = req.body.JUR_ID;
    const adrId = req.body.ADR_ID;

    Prospect.findByPk(proId)
        .then(prospect => {
            if (!prospect) {
                const error = new Error('Aucun prospect ne correspond');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(Client.findByPk(proId)
            .then(client => {
                if (client) {
                    const error = new Error('Un client correspond déjà à cette Id');
                    error.statusCode = 400;
                    throw error;
                }
            })
            .then(Client.create({
                PRO_ID: proId,
                CLI_SIRET: siret,
                CLI_RNA: rna,
                JUR_ID: jurId,
                ADR_ID: adrId
            }))
            .then(client => {
                res.status(201).json({
                    client: client
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
                console.log('Failed to create');
            })
        )
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log('Failed to create');
        });




}



exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    Client.findByPk(clientId)
        .then(client => {
            if (!client) {
                const error = new Error('Client inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return client.destroy();
        })
        .then(client => {
            res.status(200).json({
                client: client
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateClient = (req, res, next) => {
    const clientId = req.params.clientId;
    const siret = req.body.CLI_SIRET;
    const rna = req.body.CLI_RNA;
    const jurId = req.body.JUR_ID;
    const adrId = req.body.ADR_ID;

    Client.findByPk(clientId)
        .then(client => {
            if (!client) {
                const error = new Error('Client inexistant !');
                error.statusCode = 404;
                throw error;
            }

            client.CLI_SIRET = siret;
            client.CLI_RNA = rna;
            client.JUR_ID = jurId;
            client.ADR_ID = adrId;
            return client.save();
        }).then(client => {
            res.status(200).json({
                client: client
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}