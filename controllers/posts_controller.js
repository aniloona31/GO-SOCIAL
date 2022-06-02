module.exports.posts = (req,res) =>{
    return res.end('here are the posts');
}

module.exports.createPost = (req,res) => {
    return res.end('post created');
}