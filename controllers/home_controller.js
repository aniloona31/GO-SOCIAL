const Post = require('../model/Post');
const User = require('../model/User');
module.exports.home = async (req, res) => {
    // isme na sirf mujhe id likhi hui mil rhi h...postgres mei kya ho rha tha ki vo apne aap populate hojate the 
    // mtlb meine reference create ki 2 tables mei table mei id dikh rhi h sirf prr jb mei query krta tha tbb sirf id
    // ni hoti vaha pura row hota h refernced table ka...isle mei seedha findByForeginKeyId() bhi ni krta
    // pehlr foreing key ki value nikalata hu uske table se...fir findByForeignKey() ye krta hu
    // lekin yha mujhe pouplate krna pdega...
    // Post.find({},(err,posts) => {
    //     if(err){
    //         console.log('error occured while fetching posts');
    //         return;
    //     }
    //     return res.render('home',{
    //         title : "home",
    //         posts : posts
    //     })
    // })
    // populatng user in the posts document
    // populate mei key ka naam dalaege or uske schema mei ref hona jaroori h
    // populating multiple models means ek saath multiple models pupulate krna like nested pupulation(comment populate kiya comment ke andr ka user populate kiya)
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path : 'comments',
    //     populate : {
    //         path : 'user'
    //     }
    // })
    // .exec((err, posts) => {
    //     if (err) {
    //         console.log('error occured while fetching posts');
    //         return;
    //     }
    //     User.find({},(err,users) => {

    //         return res.render('home', {
    //             title: "home",
    //             posts: posts,
    //             all_users : users
    //         })
    //     })
    // })

    //using async await for a cleaner code.posts store the any responce being returned from the querry.
    try {
        const posts = await Post.find({}).populate('user').populate({ path: 'comments', populate: { path: 'user' } });
        const users = await User.find({});

        console.log(users);
        console.log(posts);
        return res.render('home', {
            title: "home",
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log('error occured');
    }
}