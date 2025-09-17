const express = require('express');
const router = express.Router();

const { getMe } = require('../Controllers/authController');
const verifyFirebaseToken = require('../Middleware/verifyFirebaseToken')

router.get('/me', verifyFirebaseToken, getMe);

module.exports = router;