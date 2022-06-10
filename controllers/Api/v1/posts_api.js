const Post = require('../../../model/Post');
const Comment = require('../../../model/Comment');

module.exports.index = (req, res) => {
    return res.json(200, {
        message: "you reached api",
        posts: []
    })
}

module.exports.getAllPosts = async (req, res) => {
    try {
        //to not populate password in the user we just add a - sign and add it to populate method
        const posts = await Post.find({}).sort('-createdAt').populate('user','-password').populate({ path: 'comments', populate: { path: 'user' } });

        return res.json(200, {
            posts: posts
        })

    } catch (err) {
        return res.status(500).send("posts not fetched");
    }
}

module.exports.deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        let post = await Post.findById(postId);

        if(post.user == req.user.id){
            await Comment.deleteMany({ post: postId });
            post.remove();
            return res.status(200).send('deleted');
        }
        else{
            return res.status(401).send("unauthorized");
        }
    } catch (err) {
        console.log('error occred');
        return res.status(500).send("some error occured");
    }
}