const path = require('path');

const express = require('express');

const prospectController = require('../controllers/prospect');

const router = express.Router();

router.get('/prospect/:prospectId', prospectController.getProspect);

router.get('/prospects', prospectController.getProspects);

module.exports = router;