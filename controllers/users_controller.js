//this is a controller which can take many users
const User = require('../model/users');

module.exports.profile = (req, res) => {
    console.log(req.cookies.user);
    const user_id = req.cookies.user;

    if(user_id){
        User.findById(user_id,(err,data) => {
            if(err){
                console.log('error occured');
                return;
            }
            if(!data){
                console.log("no user with this id present");
                return res.redirect('back');
            }
            else{
                return res.render('User_Profile',{
                    username : data.username,
                    email : data.email
                })
            }
        })
    }
    else{
        return res.redirect('/users/sign-in');
    }
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
    //find the user
    User.findOne({email : req.body.email},(err,user) => {
        if(err){
            console.log('error occured while checking user'); 
            return;
        }

        if(!user){
            console.log('user not present');
            return res.redirect('back');
        }
        else{
            //match the password
            if(user.password != req.body.password){
                console.log('user not present');
                return res.redirect('back');
            }
            else{
                //set session in cookie

                res.cookie('user' , user._id);
                return res.redirect('/users/profile');
            }
        }

    })

}