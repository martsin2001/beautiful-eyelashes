const express = require('express');
const controllers = require('../controllers/customers');
const router = express.Router();

router.get('/get-customers', controllers.getCustomers);
router.post('/to-book-place', controllers.toBookPlace);

module.exports = router;