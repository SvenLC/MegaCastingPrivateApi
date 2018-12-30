const express = require('express');

const clientController = require('../controllers/client');

const router = express.Router();

router.get('/', clientController.getClients);
router.get('/:clientId', clientController.getClient);
router.post('/', clientController.createClient);
router.delete('/:clientId', clientController.deleteClient);
router.put('/:clientId', clientController.updateClient);

module.exports = router;

