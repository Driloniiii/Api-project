const express = require('express');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.post('/', authenticate, courseController.createCourse);
router.get('/:id', authenticate, courseController.getCourse);
router.post('/enroll', authenticate, courseController.enrollStudent);
router.get('/:id/students', authenticate, courseController.getEnrolledStudents);
router.delete('/:id', authenticate, authorizeAdmin, courseController.deleteCourse);

module.exports = router;
