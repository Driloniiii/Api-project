const Course = require('../models/course');
const User = require('../models/user');

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const instructorId = req.user._id;
    const course = new Course({ title, description, instructorId });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructorId');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.enrollStudent = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user._id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.students.includes(studentId)) return res.status(400).json({ error: 'Already enrolled' });

    course.students.push(studentId);
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEnrolledStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course.students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
