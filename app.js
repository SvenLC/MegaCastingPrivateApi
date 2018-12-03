const http = require('http');
const path = require('path');

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

const sequelize = require('./util/database');
const express = require('express');
const app = express();

const utilisateurRoutes = require('./routes/utilisateur');
const prospectRoutes = require('./routes/prospect');

app.use(utilisateurRoutes);
app.use(prospectRoutes);


app.route('/').get(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>API MegaCasting</h1>');
});

sequelize
    .sync()
    .then(
        app.listen(port, function () {
            var datetime = new Date();
            var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
            console.log(message);
        })
    )
    .catch(err => {
            console.log(err);
        }

);