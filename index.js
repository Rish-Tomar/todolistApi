// <--   IMPORTS -->
const express     = require('express')
const mongoose    = require('mongoose')
const db          = require('./config/mongoose.js')
const passportJWT = require('./config/passportJWT') 
// <-- MIDDLEWARES-->


// <-- FIRMWARES-->
const app=express();
app.use(express.urlencoded())
app.use('/',require('./routes'))


// <-- SERVER LISTENING-->
app.listen(8001, (err)=>{
    if(err){
        console.log('error occured while starting or listening at port',err);
    }
    console.log('server is up and running at PORT No. 8001')
})