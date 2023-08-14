const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const controller = require('./controller');
const upload = require('../../middleware/multer');

router.post('/uploads', auth, upload.single('image'), controller.uploadImage);

module.exports = router;
