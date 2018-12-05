const path = require('path');

const express = require('express');

const utilisateurController = require('../controllers/utilisateur');

const router = express.Router();

router.get('/:utilisateurId', utilisateurController.getUtilisateur);

router.get('/', utilisateurController.getUtilisateurs);

router.post('/', utilisateurController.createUtilisateur);

router.delete('/:utilisateurId', utilisateurController.deleteUtilisateur);

router.put('/:utilisateurId', utilisateurController.updateUtilisateur);

module.exports = router;

