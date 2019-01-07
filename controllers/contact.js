const sequelize = require('../util/database');

const Contact = sequelize.import('../models/T_E_CONTACT_CTC');

exports.getContacts = (req, res, next) => {
    Contact.findAll()
        .then(contact => {
            res.status(200).json({ contact: contact });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                const error = new Error('Contact inexistante !');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ contact: contact });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.createContact = (req, res, next) => {
    const description = req.body.CTC_DESCRIPTION;
    const tel = req.body.CTC_NUM_TEL;
    const fax = req.body.CTC_NUM_FAX;
    const email = req.body.CTC_EMAIL;
    const principale = req.body.CTC_PRINCIPALE;
    const proId = req.body.PRO_ID;

    Contact.create({
        CTC_DESCRIPTION: description,
        CTC_NUM_TEL: tel,
        CTC_NUM_FAX: fax,
        CTC_EMAIL: email,
        CTC_PRINCIPALE: principale,
        PRO_ID: proId

    })
        .then(contact => {
            res.status(201).json({ contact: contact })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log('Failed to create');
        });
}

exports.deleteContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                const error = new Error('Contact inexistant !');
                error.statusCode = 404;
                throw error;
            }
            return contact.destroy();
        }).then(contact => {
            res.status(200).json({ contact: contact});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateContact = (req, res, next) => {
    const contactId = req.params.contactId;
    const description = req.body.CTC_DESCRIPTION;
    const tel = req.body.CTC_NUM_TEL;
    const fax = req.body.CTC_NUM_FAX;
    const email = req.body.CTC_EMAIL;
    const principale = req.body.CTC_PRINCIPALE;
    const proId = req.body.PRO_ID;

    Contact.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                const error = new Error('Contact inexistant !');
                error.statusCode = 404;
                throw error;
            }
            contact.CTC_DESCRIPTION = description;
            contact.CTC_NUM_TEL = tel;
            contact.CTC_NUM_FAX = fax;
            contact.CTC_EMAIL = email;
            contact.CTC_PRINCIPALE = principale;
            contact.PRO_ID = proId;
            return contact.save();
        }).then(contact => {
            res.status(200).json({ contact: contact });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

