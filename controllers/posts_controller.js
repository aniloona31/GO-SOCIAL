const Post = require('../model/Post');
module.exports.posts = (req,res) =>{
    return res.end('here are the posts');
}

module.exports.createPost = (req,res) => {
    if(req.isAuthenticated()){
        Post.create({
            content : req.body.content,
            user : req.user._id
        }),(err,data)=>{
            if(err){
                console.log('error occured while creating post');
                return;
            }
        }
    }
    return res.redirect('back');
}

