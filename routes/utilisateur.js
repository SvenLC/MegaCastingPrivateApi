const express = require('express');
const { body } = require('express-validator/check');

const utilisateurController = require('../controllers/utilisateur');

const router = express.Router();

router.get('/:utilisateurId', utilisateurController.getUtilisateur);

router.get('/', utilisateurController.getUtilisateurs);

router.post('/', [
    body('UTI_MDP')
        .trim()
        .isLength({ min: 6 }),
    body('UTI_LOGIN')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4 })
], utilisateurController.createUtilisateur);

router.delete('/:utilisateurId', utilisateurController.deleteUtilisateur);

router.put('/:utilisateurId', [
    body('UTI_MDP')
        .trim()
        .isLength({ min: 6 }),
    body('UTI_LOGIN')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4 })
], utilisateurController.updateUtilisateur);

module.exports = router;

