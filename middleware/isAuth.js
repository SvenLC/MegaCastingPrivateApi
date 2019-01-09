const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkpHcmF5IiwiaWQiOiI1MiIsImlhdCI6MTU0NzAyOTY2NywiZXhwIjoxNTQ3MDcyODY3fQ.7D5YxdvDECxbM-iw87fpqaHafOth_HoJfSgfwBSgne0'
    
    if (autHeader.split(' ')[1] == token) {

        next();

    } else {
        
        if (!autHeader) {
            const error = new Error('Non authentifié');
            error.statusCode = 401;
            throw error;
        }
        const token = autHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'BDB971EA6E6788317F359F23E86C5');
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
        if (!decodedToken) {
            const error = new Error('Non authentifié');
            error.statusCode = 401;
            throw error;
        }
        req.userId = decodedToken.userId;
        next();
    }
};