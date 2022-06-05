const Post = require('../model/Post');
module.exports.home = (req, res) => {
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
    Post.find({}).populate('user').exec((err, posts) => {
        if (err) {
            console.log('error occured while fetching posts');
            return;
        }
        return res.render('home', {
            title: "home",
            posts: posts
        })
    })
}