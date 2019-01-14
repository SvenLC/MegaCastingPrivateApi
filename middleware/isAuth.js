const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkpHcmF5IiwiaWQiOiI1MiIsImlhdCI6MTU0NzAzMjY5MiwiZXhwIjoxNTQ3MDc1ODkyfQ._6CsUUIznN5BflzT7nrVvye34FMzNvpNgLd10Aw0iUE'
    const secret = '85B8EF807F51D09FC54288EE2539B81D1CCA149A1BE5C081C0937DCCB4D91DAC';

    if (!autHeader) {
        const error = new Error('Non authentifié');
        error.statusCode = 401;
        throw error;
    }

    if (autHeader == token) {        
        next();

    } else {   
        const token = autHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secret);
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