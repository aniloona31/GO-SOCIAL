const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/User');

passport.use(new googleStrategy({
    clientID : '166474660829-fhef8icblcee8j9eg6r15mhv4rmsjnch.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : "http://localhost:3001/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    console.log(accessToken);
    User.findOne({email : profile.emails[0].value}).exec((err,user) => {
        if(err){
            console.log("error "+err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null, user);
        } 
        else{
            User.create({
                username : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            },(err,user) => {
                if(err){
                    console.log("error in creating user",err);
                    return;
                }
                return done(null,user);
            })
        }
    });
}))

module.exports = passport;