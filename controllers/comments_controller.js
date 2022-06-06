const Comment = require('../model/Comment');
const Post = require('../model/Post');
module.exports.addComment = (req,res) => {
    
    if(req.isAuthenticated()){
        console.log("i am here")
        const postId = req.query.id;
        Post.findById(postId,(err,post) => {
            // console.log(post);
            if(post){
                Comment.create({
                    user : req.user._id,
                    post : postId,
                    comment : req.body.comment
                },(err,data) => {
                    // console.log("error"  + err);
                    // console.log("data",data);
                    if(data){
                        // console.log(data);
                        //i have the post so i need not find it.
                        // Post.findByIdAndUpdate(postId,{$push : {"comments" : data._id}},(err,post)=>{
                        //     if(err){
                        //         console.log("error while adding comment to post array");
                        //         return;
                        //     }
                        // })
                        post.comments.push(data);
                        post.save();
                    }
                    res.redirect('back');
                })
            }
        })
    }
}

module.exports.deleteComment = (req,res) =>{
    const commentId = req.params.id;
    Comment.findById(commentId,((err,comment)=>{
        if(err){
            console.log('comment not found');
            return;
        }
        //this way uses mongodb syntax and is better.
        Post.findByIdAndUpdate(comment.post,{$pull : {comments : commentId}},(err,post) => {
        });
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
        
    }))
    res.redirect('/');
}