const Comment = require('../model/Comment');
const Post = require('../model/Post');
const commentMailer = require('../mailer/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_worker');
const Like = require('../model/Like');

module.exports.addComment = async (req, res) => {

    if (req.isAuthenticated()) {
        // console.log("i am here")
        const postId = req.query.id;
        const post = await Post.findById(postId);
        if (post) {
            const comment = await Comment.create({
                user: req.user._id,
                post: postId,
                comment: req.body.comment
            });
            // console.log(comment);
            post.comments.push(comment._id);
            post.save();
            await comment.populate('user');
            // console.log(comment);
            // commentMailer.newComment(comment);
            let job = queue.create('emails', comment).save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(job.id);
            });

        }
        res.redirect('back');
    }
}

module.exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        let comment = await Comment.findById(commentId);

        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
        //this uses  the normal java script method.
        // Post.findById(comment.post,(err,post) => {
        //     const idx = post.comments.findIndex((id) => id.equals(commentId));
        //     console.log(idx);
        //     if(idx == -1){
        //         return res.redirect('/');
        //     }
        //     post.comments.splice(idx,1);
        //     post.save();
        // })
        comment.remove();
        return res.redirect('/');

    } catch (err) {
        console.log('error occured');
        return;
    }
}

module.exports.likeComment = async (req, res) => {
    const commentId = req.params.id;

    let comment = await Comment.findById(commentId);

    if (!comment) {
        console.log("no such post exists");
        return res.redirect('back');
    }

    let checkLike = await Like.findOne({ 'user': req.user._id, 'likeable': commentId });
    if (!checkLike) {
        let like = await Like.create({
            user: req.user._id,
            likeable: commentId,
            onModel: 'Comment'
        })

        comment.likes.push(like._id);
        comment.save();
    }
    else{
        // let idx = comment.likes.findIndex((like) => like.equals(checkLike._id));
        // if(idx != -1){
        //     comment.likes.splice(idx,1);
        //     comment.save();
        // }
        comment.likes.pull(checkLike._id);
        comment.save();
        checkLike.remove();
    }

    return res.redirect('back');
}
