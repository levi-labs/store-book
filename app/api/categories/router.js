const express = require('express');

const router = express.Router();
const { auth } = require('../../middleware/auth');
const controler = require('./controller');

router.get('/categories', auth, controler.getAllCategories);
router.post('/categories', auth, controler.createCategories);
router.put('/categories/:id', auth, controler.updateCategories);
router.delete('/categories/:id', auth, controler.destroyCategories);

module.exports = router;
