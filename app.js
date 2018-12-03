const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');


const port = process.env.PORT || 3000

const sequelize = require('./util/database');
const express = require('express');
const app = express();

const utilisateurRoutes = require('./routes/utilisateur');
const prospectRoutes = require('./routes/prospect');

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/utilisateur', utilisateurRoutes);
app.use('/prospect', prospectRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
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