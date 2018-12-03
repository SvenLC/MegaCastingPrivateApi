const path = require('path');

const express = require('express');

const utilisateurController = require('../controllers/utilisateur');

const router = express.Router();

router.get('/utilisateur/:utilisateurId', utilisateurController.getUtilisateur);

router.get('/utilisateurs', utilisateurController.getUtilisateurs);

module.exports = router;

