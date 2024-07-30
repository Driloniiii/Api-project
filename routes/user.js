const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/:id', authController.getUser);
router.put('/:id', authController.updateUser);

module.exports = router;
