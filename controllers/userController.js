const User = require('../models/user')

module.exports.createUser = async (req,res)=>{
    const user =await User.create({name:'RT',email:'default@gmail.com',password:'Default@2022'})
    if(user){
        console.log('created');
        return
    }
    console.log('error');
    return
}