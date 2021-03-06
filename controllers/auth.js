const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sequelize = require('../util/database');

const secret = '85B8EF807F51D09FC54288EE2539B81D1CCA149A1BE5C081C0937DCCB4D91DAC';

const User = sequelize.import('../models/T_S_UTILISATEUR_UTI');

exports.login = (req, res, next) => {
    const login = req.body.UTI_LOGIN;
    const password = req.body.UTI_MDP;
    let loadedUser;

    sequelize.query(`SELECT
        UTI_ID,
        UTI_LOGIN,
        UTI_MDP
        FROM T_S_UTILISATEUR_UTI
        WHERE UTI_LOGIN = '${login}' `
        , { model: User})
        .then(user => {            
            if (user[0] === undefined) {                
                const error = new Error('Aucun utilisateur avec ce login n\'a été trouvé');
                error.statusCode = 401;                
                throw error;                
            }
            loadedUser = user;           
           return bcrypt.compare(password, user[0].UTI_MDP);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Mot de passe incorrect');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                login: loadedUser[0].UTI_LOGIN,
                id: String(loadedUser[0].UTI_ID)
            }, secret,
                { expiresIn: '12h' }
            );
            res.status(200).json({ UTI_ID: loadedUser[0].UTI_ID.toString(), UTI_TOKEN: token });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);

        });
};

