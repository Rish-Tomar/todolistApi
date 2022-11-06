const User = require('../../models/user')
const createJWT = require('jsonwebtoken')
const JWTKEY = 'localjwtkey';



module.exports.createSession = async (req,res)=>{
    try{
        console.log(req.body)
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:'Invalid username or password'
            })
        }

        return res.status(200).json({
            message:"user authenticaterd sending token",
            data:{
                accesstoken:createJWT.sign(user.toJSON(),JWTKEY, {expiresIn:'1800000'}),
                id:user._id
            }
        })
    }catch(err){
        console.log('error occured');
        return res.json(500,{
            message:'INTERNAL server error'
        })

    }
}

module.exports.createTodo = async (req,res)=>{
    //will have a post call
    console.log('recieved data',req.params)
    try{
        let user = await User.findById(req.params.id); //recieving id as the params
        if(!user){
            return res.status(404).json({
                message:'No user found with this email id'
            })
        }
        // now add the data 
        const listLength = user.todolist.length
        console.log('listLength',listLength)

        const listItem = {
            id:listLength+1,
            title:req.body.title,
            time:req.body.date
        }
        user.todolist.push(listItem)
        user.save()
        return res.status(200).json({
            message:'u can add the todo item'
        })
    }
    catch(err){
        return res.status(422).json({
            message:'u cannot !! server error'
        })
    }
}

//to update item inside todo list
module.exports.updateTodo = async (req,res)=>{
    console.log('recieved as',req.body,req.params)

    try{
        const user = await User.findOneAndUpdate({_id:req.params.userid,"todolist.id":req.params.todoid},{$set:{"todolist.$.title":req.body.title}})
        // const user = await User.findOne({_id:req.params.userid,"todolist.id":req.params.todoid})
        
        console.log('user lists',user.todolist)

        if(user){
            console.log('user lists',user.todolist)
            // console.log('user is',user)
            return res.status(200).json({
                message:'update Successful'
            })
        }
        return res.status(422).json({
            error:'cannot update the title either the user dsoesnot exist or the todo item with the id does not exists'
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

//to delete the todo item
module.exports.deleteTodo = async (req,res)=>{
    console.log('delete request execution',req.params.userid)

    try{
       User.findOneAndUpdate({_id:req.params.userid},{$pull:{todolist:{id:req.params.todoid}}},(err,data)=>{
        if(err){
            console.log(err)
            return res.status(404).json({
                error:'the to do item was not deleted'
            })
        }
        return res.status(200).json({
                    message:'To do item deleted'
                })
       })
   
    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }

}