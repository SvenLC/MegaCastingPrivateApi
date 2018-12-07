const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');


const port = process.env.PORT || 3000

const sequelize = require('./util/database');
const express = require('express');
const app = express();

const adresseRoutes = require('./routes/adresse');
const contactRoutes = require('./routes/contact');
const contenuRoutes = require('./routes/contenuEditorial');
const prospectRoutes = require('./routes/prospect');
const clientRoutes = require('./routes/client');
const partenaireRoutes= require('./routes/partenaire');
const typeContenuRoutes = require('./routes/contenuEditorialType');
const domaineMetierRoutes = require('./routes/domaineMetier');
const localisationRoutes = require('./routes/localisation');
const metierRoutes = require('./routes/metier');
const statutJuridiqueRoutes = require('./routes/statutJuridique');
const contratRoutes = require('./routes/contrat');
const utilisateurRoutes = require('./routes/utilisateur');

const defaultRoutes = require('./routes/index');


app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/adresse', adresseRoutes);
app.use('/contact', contactRoutes);
app.use('/contenu', contenuRoutes);
app.use('/prospect', prospectRoutes);
app.use('/client', clientRoutes);
app.use('/partenaire', partenaireRoutes);
app.use('/typeContenu', typeContenuRoutes);
app.use('/domaineMetier', domaineMetierRoutes);
app.use('/localisation', localisationRoutes)
app.use('/metier', metierRoutes);
app.use('/statutJuridique', statutJuridiqueRoutes);

app.use('/utilisateur', utilisateurRoutes);

app.use('/contrat', contratRoutes);

app.use('/', defaultRoutes);

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

module.exports = app;