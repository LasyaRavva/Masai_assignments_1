const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');

// POST /signup - Register a new user
router.post('/signup', validateSignup, authController.signup);

// POST /login - Authenticate user and return JWT token
router.post('/login', validateLogin, authController.login);

module.exports = router;
