const express = require('express');

const clientController = require('../controllers/auth');

const router = express.Router();

router.post('/signup');

module.exports = router;

