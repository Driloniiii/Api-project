const Thread = require('../models/thread');
const Reply = require('../models/reply');

exports.createThread = async (req, res) => {
  try {
    const { courseId, title, content } = req.body;
    const thread = new Thread({ courseId, title, content, instructorId: req.user._id });
    await thread.save();
    res.status(201).json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate('replies');
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replyToThread = async (req, res) => {
  try {
    const { content } = req.body;
    const reply = new Reply({ threadId: req.params.id, content, creatorId: req.user._id });
    await reply.save();
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a thread
exports.deleteThread = async (req, res) => {
  try {
    const thread = await Thread.findByIdAndDelete(req.params.id);
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    await Reply.deleteMany({ threadId: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a reply
exports.deleteReply = async (req, res) => {
  try {
    const { threadId, replyId } = req.params;
    const reply = await Reply.findOneAndDelete({ _id: replyId, threadId, creatorId: req.user._id });
    if (!reply) return res.status(404).json({ error: 'Reply not found or not authorized' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
