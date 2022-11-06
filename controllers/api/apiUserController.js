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

// "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY3NjQwYjAxZmUzZjhjNzNmYTM0ZTUiLCJuYW1lIjoiUlQiLCJwYXNzd29yZCI6IkRlZmF1bHRAMjAyMiIsImVtYWlsIjoiZGVmYXVsdEBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIyLTExLTA2VDA3OjM2OjQzLjQ3MVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTA2VDExOjMxOjMzLjc4NVoiLCJfX3YiOjIsInRvZG9saXN0IjpbeyJpZCI6MSwidGl0bGUiOiJrdWNoIG5haGkiLCJ0aW1lIjoiMjAyMi0wOS0yMFQwMDowMDowMC4wMDBaIiwiX2lkIjoiNjM2NzlhZWVkM2RiNGUzNmMxNzc3NTVkIn1dLCJpYXQiOjE2Njc3MzU4MTYsImV4cCI6MTY2NzczNzYxNn0.Q5tXM78gqPqcML52ox9_wEoGQ8gLER0YLGu8c-b7UJE",
//         "id": "6367640b01fe3f8c73fa34e5"