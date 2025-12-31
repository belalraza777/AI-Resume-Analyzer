const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authVerify');
const { registerValidation, loginValidation } = require('../utils/joiValidation');

// GET /auth/me - get current user (protected)
router.get('/me', verifyToken, authController.getMe);

// POST /auth/register - with validation
router.post('/register', registerValidation, authController.register);

// POST /auth/login - with validation
router.post('/login', loginValidation, authController.loginUser);

// POST /auth/logout
router.post('/logout', authController.logoutUser);

// POST /auth/refresh - refresh access token
router.post('/refresh', authController.refreshAccessToken);

module.exports = router;
