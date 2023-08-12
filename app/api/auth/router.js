const express = require('express');

const router = express.Router();
const controller = require('./controller');

router.post('/auth/signin', controller.signIn);
module.exports = router;
