const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth');
const controller = require('./controller');

router.get('/transactions', auth, controller.getTransactionList);
router.get('/transactions/:id', auth, controller.getDetailTransaction);
module.exports = router;
