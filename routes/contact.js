const express = require('express');

const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/', contactController.getContacts);
router.get('/:contactId', contactController.getContact);
router.post('/', contactController.createContact);
router.delete('/:contactId', contactController.deleteContact);
router.put('/:contactId', contactController.updateContact);

module.exports = router;