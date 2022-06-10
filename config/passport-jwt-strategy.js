const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy; //this is the strategy that we are going to use

//module that will help us extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../model/User');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'anirudh'
}

passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id,(err,user) => {
        if(err){
            console.log("error occured");
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }) 
}));

//to create jwt token we need jsonwebtoken library

module.exports = passport;