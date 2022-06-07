const Post = require('../model/Post');
const Comment = require('../model/Comment');
module.exports.posts = (req, res) => {
    return res.end('here are the posts');
}

module.exports.createPost = (req, res) => {
    if (req.isAuthenticated()) {
        Post.create({
            content: req.body.content,
            user: req.user._id
        }), (err, data) => {
            if (err) {
                console.log('error occured while creating post');
                return;
            }
        }
    }
    return res.redirect('back');
}

module.exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    // console.log("yes");
    // Post.findById(postId,(err,post) => {
    //     if(err){
    //         console.log('post not found')
    //         return;
    //     }
    //     //if i write req.user.id it is of type string and req.user._id is of type ObjectId
    //     if(post.user.equals(req.user._id)){
    //         // console.log(post.user , req.user._id);
    //         // for(let commentId of post.comments){
    //         //     Comment.findByIdAndDelete(commentId,(err,data)=>{
    //         //         if(err){
    //         //             console.log('error in deleting the comment');
    //         //             return;
    //         //         }
    //         //         // console.log(data);
    //         //     });
    //         // }this is one way to do things
    //         post.remove();

    //         //deleteMany is used to delete all thich contains this parameter
    //         Comment.deleteMany({post : postId},(err,data) => {
    //             if(err){
    //                 console.log("error while deleting the comments");
    //                 return;
    //             }
    //         })
    //     }
    // });
    try {
        let post = await Post.findById(postId);

        if (post.user.equals(req.user._id)) {
            let comment = await Comment.deleteMany({ post: postId });
            post.remove();
        }

        res.redirect('/');
    } catch (err) {
        console.log('error occred');
        return;
    }
}

