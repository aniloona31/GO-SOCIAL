const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Post'
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;