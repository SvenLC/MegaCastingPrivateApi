const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const isAuth = require('./middleware/isAuth');
const adresseRoutes = require('./routes/adresse');
const contactRoutes = require('./routes/contact');
const contenuRoutes = require('./routes/contenuEditorial');
const prospectRoutes = require('./routes/prospect');
const clientRoutes = require('./routes/client');
const codePostalRoutes = require('./routes/codePostal');
const partenaireRoutes = require('./routes/partenaire');
const typeContenuRoutes = require('./routes/contenuEditorialType');
const domaineMetierRoutes = require('./routes/domaineMetier');
const localisationRoutes = require('./routes/localisation');
const metierRoutes = require('./routes/metier');
const offreRoutes = require('./routes/offreCasting');
const statutJuridiqueRoutes = require('./routes/statutJuridique');
const contratRoutes = require('./routes/contrat');
const utilisateurRoutes = require('./routes/utilisateur');
const defaultRoutes = require('./routes/index');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', defaultRoutes);
app.use('/auth', authRoutes);
app.use('/adresses', isAuth, adresseRoutes);
app.use('/contacts', isAuth, contactRoutes);
app.use('/contenus', isAuth, contenuRoutes);
app.use('/prospects', isAuth, prospectRoutes);
app.use('/clients', isAuth, clientRoutes);
app.use('/codePostaux', isAuth, codePostalRoutes);
app.use('/partenaires', isAuth, partenaireRoutes);
app.use('/typeContenus', isAuth, typeContenuRoutes);
app.use('/domaineMetiers', isAuth, domaineMetierRoutes);
app.use('/localisations' ,isAuth, localisationRoutes)
app.use('/metiers' ,isAuth, metierRoutes);
app.use('/offreCastings', isAuth, offreRoutes);
app.use('/statutJuridiques' ,isAuth, statutJuridiqueRoutes);
app.use('/utilisateurs' ,isAuth, utilisateurRoutes);
app.use('/contrats' ,isAuth, contratRoutes);


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