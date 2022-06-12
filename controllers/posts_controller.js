const Post = require('../model/Post');
const Comment = require('../model/Comment');
const Like = require('../model/Like');
module.exports.posts = (req, res) => {
    return res.end('here are the posts');
}

module.exports.createPost = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            })
        }
        // return res.redirect('back');
    } catch (err) {
        return res.status(401).send('post not created');
    }
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

module.exports.likePost = async (req, res) => {
    const postId = req.params.id;

    let post = await Post.findById(postId);
    if (!post) {
        console.log("no such post exists");
        return res.redirect('back');
    }

    const checkLike = await Like.findOne({ 'likeable': postId,'user' : req.user._id });
    console.log(checkLike);
    if (!checkLike) {
        
        let like = await Like.create({
            user: req.user._id,
            likeable: postId,
            onModel: 'Post'
        })

        post.likes.push(like._id);
        post.save();

    }
    else{
        console.log("here")
        let idx = post.likes.findIndex((like) => like.equals(checkLike._id));
        if(idx != -1){
            post.likes.splice(idx,1);
            post.save();
        }
        checkLike.remove();
    }
    return res.redirect('back');
}


