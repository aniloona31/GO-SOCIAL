//this is a controller which can take many users
const User = require('../model/User');

module.exports.profile = (req, res) => {
    const userId = req.params.id;
    User.findById(userId,(err,user) => {
        if(user){
            res.render('profile',{
                selected_user : user
            })
        }
        else{
            res.redirect('/');
        }
    })
    // res.redirect('/')
}

//to render signup page
module.exports.signUp = (req, res) => {
    //when we sign in using passport.js it adds user to the request if the request is not present means we are not logged in
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.render('signup');
}

//to render sign in page
module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.render('signin');
}

//to create a user
module.exports.create = (req, res) => {

    //Authentication Steps
    //1. Create user
    //2. Create Session
    //3. Show details of signed in user on profile page
    //4. Sign Out

    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    console.log(req.body);

    //checking if user with same email is allready present
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log('error in getting user from database');
            return;
        }

        if (!user) {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },(err,user) => {
                if (err) {
                    console.log('error in creating user in database');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }

    })

}

//sign in and create a session for the user
module.exports.createSession = (req, res) => {
    return res.redirect('/')
}

module.exports.signOut = (req,res,next) =>{
    // res.clearCookie('codeial');
    // console.log('cookie removed');
    //this function is given by passport.js
    //this function doesn't remove a cookie but makes the session invalid
    console.log("i am here")
    req.logout((err)=>{
        if(err){
            console.log('error occured while logging out');
            return next(err);
        }
        res.redirect('/');
    });
}