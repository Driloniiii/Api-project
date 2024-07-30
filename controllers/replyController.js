const Reply = require('../models/reply');
const Thread = require('../models/thread');
const Course = require('../models/course');

const postReply = async (req, res) => {
  const { threadId, content } = req.body;
  const userId = req.user._id;

  console.log('User ID:', userId);
  console.log('Request Body:', req.body);

  try {
    const thread = await Thread.findById(threadId).populate('courseId');
    if (!thread) return res.status(404).json({ error: 'Thread not found' });

    const course = await Course.findById(thread.courseId._id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (!course.students.includes(userId)) {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }

    const newReply = new Reply({ threadId, userId, content });
    await newReply.save();
    res.status(201).json({ message: 'Reply posted successfully', reply: newReply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteReply = async (req, res) => {
  const { replyId } = req.params;
  const userId = req.user._id;

  try {
    const reply = await Reply.findById(replyId).populate('threadId');
    if (!reply) return res.status(404).json({ error: 'Reply not found' });

    const thread = await Thread.findById(reply.threadId._id);
    if (!thread) return res.status(404).json({ error: 'Thread not found' });

    if (thread.instructorId.equals(userId) || reply.userId.equals(userId)) {
      await Reply.findByIdAndDelete(replyId);
      res.status(200).json({ message: 'Reply deleted successfully' });
    } else {
      res.status(403).json({ error: 'Not authorized to delete this reply' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postReply, deleteReply };
