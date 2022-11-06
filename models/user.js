const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    todolist:[
        {
            id:{
                type:Number,
                required:true
            },
            title:{
                type:String,
                required:true
            },
            time:{
               type:Date
            }
        }
    ]
   
},{
  timestamps:true
})


const User = mongoose.model('User',userSchema)

module.exports=User