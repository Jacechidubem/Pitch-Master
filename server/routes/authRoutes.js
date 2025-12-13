const express = require('express');
const router = express.Router();

// 1. Import verifyUser from the controller
const { registerUser, loginUser, verifyUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. Add this route to handle the Email Link
// (It must be a GET request because clicking a link is a GET action)
router.get('/verify/:token', verifyUser);

module.exports = router;