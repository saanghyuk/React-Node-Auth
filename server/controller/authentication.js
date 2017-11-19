const jwt= require('jwt-simple');
const User = require('../models/user');

const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin=function(req, res, next){
    //User has alreay had their email and password auth'd
    //We just need to give them a token

    //아래 이거 passport가 알아서 주는 거야
    res.send({token:tokenForUser(req.user)})
};

exports.signup=function(req, res, next){
    const email= req.body.email;
    const password = req.body.password;
    if(!email || !password){
        return res.status(422).send({error: 'You must provide email and password'})
    }
    //See if a user with the given email exists
    User.findOne({ email }, function(err, existingUser){
        if(err){
            return next(err)
        }
        if(existingUser){
            return res.status(422).send({error: 'Email is in use'});
        }
    });
    //If a user with email does exist, return an error
    const user = new User({
        email,
        password
    });
    user.save(function(err){

        if(err){return next(err);}

            res.json({token: tokenForUser(user)});
    })
    //If a user with eamil does NOT exist, create and save user record
    //Response to request indicating the user was created
};