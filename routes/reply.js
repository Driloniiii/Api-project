const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const replyController = require('../controllers/replyController');
const router = express.Router();

router.post('/', authenticate, replyController.postReply);
router.delete('/:replyId', authenticate, replyController.deleteReply);

module.exports = router;
