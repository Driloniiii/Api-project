const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.delete('/courses/:id', authenticate, adminController.deleteCourse);

module.exports = router;
