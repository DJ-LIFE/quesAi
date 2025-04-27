const express = require('express');
const { signup, signin, logout } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', authMiddleware, logout);


module.exports = router;