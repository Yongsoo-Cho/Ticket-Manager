const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.js');

router.post('/create', commentController.createComment);
router.delete('/:commentId', commentController.deleteComment)

module.exports = router;