const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', [
    body('UTI_MDP')
    .trim()
    .isLength({ min : 6}),
    body('UTI_LOGIN')
    .trim()
    .not()
    .isEmpty()
], authController.signup);

module.exports = router;

