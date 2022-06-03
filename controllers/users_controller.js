//this is a controller which can take many users
const User = require('../model/users');

module.exports.profile = (req, res) => {
    res.render('User_Profile', {
        username: "anirudh",
        email: "ani@gmail.com"
    })
}

//to render signup page
module.exports.signUp = (req, res) => {
    res.render('signup');
}

//to render sign in page
module.exports.signIn = (req, res) => {
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

//to login user
module.exports.createSession = (req, res) => {
    console.log(req.body);
}