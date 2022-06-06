const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/User')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done) {
        //find a user and establish the identity
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log('error finding a user using passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('bad credentials using passport');
                return done(null, false);
            }

            return done(null, user);
        })
    }
))

//serializing the user to decide which key is to be kept in the cookie
//this automatically encrypts in the cookie
passport.serializeUser((user, done) => {
    done(null, user._id);
})


//deserializing the user from the key in the cookies.
//to decrypt the encrypted id
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('error occured');
            return done(err);
        }
        return done(null, user);
    })
})

//check if the user is authenticated
passport.checkAuthentication = (req,res,next) =>{
    //if the user is signed in, then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not authenticated
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = (req,res,next) =>{
    //is authenticated is an inbuilt method
    if(req.isAuthenticated()){
        //req.user contains the user session from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user;
    }
    //currently our session is temporary we dont have it stored anywhere...when we resatart application the user gets logged out
    return next();
}


module.exports = passport;