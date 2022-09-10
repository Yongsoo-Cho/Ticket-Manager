const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    const comment = new Comment({
        userId: req.body.userId,
        ticketId: req.body.ticketId,
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    await comment.save();

    res.json({ message: 'comment created' });
};

exports.deleteComment = async(req,res) => {
    await Comment.deleteOne({_id: req.params.commentId });
    res.json({message: 'Comment has been deleted.'});
};

exports.listComments = async(req, res) => {
    const { ticketId } = req.body;

    const comments = await Comment.find( {ticketId} );

    res.json(comments);
};
