const Post = require('../model/Post');
const Comment = require('../model/Comment');
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

module.exports.addComment = (req,res) => {
    if(req.isAuthenticated()){
        Comment.create({
            user : req.user._id,
            comment : req.body.comment,
            post : req.query.id
        }),(err,data)=>{
            if(err){
                console.log('error while adding comment to db');
                return;
            }
        }
        return res.redirect('back');
    }
}