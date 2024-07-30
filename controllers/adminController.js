const Course = require('../models/course');

exports.deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Not authorized' });

    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) return res.status(404).json({ error: 'Course not found' });

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
