const express = require('express');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const threadController = require('../controllers/threadController');
const router = express.Router();

router.post('/', authenticate, threadController.createThread);
router.get('/:id', authenticate, threadController.getThread);
router.post('/:id/reply', authenticate, threadController.replyToThread);
router.delete('/:id', authenticate, authorizeAdmin, threadController.deleteThread);
router.delete('/:threadId/replies/:replyId', authenticate, threadController.deleteReply);

module.exports = router;
