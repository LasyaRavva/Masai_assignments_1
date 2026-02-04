const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup } = require('../middleware/validation');

// POST /signup - Register a new user
router.post('/signup', validateSignup, authController.signup);

// GET /myprofile - Get user profile by name
router.get('/myprofile', authController.getProfile);

module.exports = router;
