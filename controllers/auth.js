const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database');

const User = sequelize.import('../models/T_S_UTILISATEUR_UTI');

exports.login = (req, res, next) => {
    const login = req.body.UTI_LOGIN;
    const password = req.body.UTI_MDP;
    let loadedUser;

    User.findOne({ where: { UTI_LOGIN: login } })
        .then(user => {
            console.log(user.UTI_MDP);
            if (!user) {
                const error = new error('Aucun utilisateur avec ce login n\'a été trouvé');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.UTI_MDP);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Mot de passe incorrect');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                login: loadedUser.UTI_LOGIN,
                id: loadedUser.UTI_ID
            }, 'BDB971EA6E6788317F359F23E86C5',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser.UTI_ID.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);

        });
};

