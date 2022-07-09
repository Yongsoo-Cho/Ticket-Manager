const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CommentSchema = new schema({
    userId: String,
    ticketId: String,
    createdAt: Date,
    updatedAt: Date,
    content: String
});

// data access object
const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;

