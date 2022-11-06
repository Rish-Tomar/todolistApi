const passport = require('passport')
const JWT      = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../models/user')

const JWTKEY = 'localjwtkey'; //this needs to be hidden before putting into github or while production phase

let opts ={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:JWTKEY
}

passport.use(new JWT(opts, (jwtPayLoad,done)=>{
    User.findOne({email:jwtPayLoad.email},(err,user)=>{
        console.log('jwt payload',jwtPayLoad)
        if(err){
            console.log('Error in finding user');
            return;
        }
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
}))

module.exports = passport