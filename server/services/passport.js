const passport = require('passport');
const User = require('../models/user');
const config= require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin= new LocalStrategy(localOptions, function(email, password, done){
    //Verify this username and password, call done with the user
    //if it is the correct email and password
    //otherwise, call done with false
    User.findOne({email: email}, function(err, user){
        if(err){ return(err); }
        if(!user){ return done(null, false) };


        //Compare password - is 'password' equal to user.password?
        //그런데 hash/salted password가 저장되어 있잖아. decode 해야됨
    user.comparePassword(password, function(error, isMatch){
        if(err){ return done(err) }

        if(!isMatch){ return done(null, false)}

        return done(null, user) //알아서 넘어간다 user가, req.user로 사용 가능

        })
    })
});


//Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

    //See if the user ID in the payload exists in our database

    //If it does call 'done' with that user
    //Otherwise, call done without a user object
    User.findById(payload.sub, function(err, user){

        //false (we didn't find user이라는 뜻)
        if(err){return done(err, false)}

        if(user){
            done(null, user)
        }else{
            done(null, false)
        }

    })
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);