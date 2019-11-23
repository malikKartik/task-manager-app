const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User',{
    name:{
        type:String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(value.includes("password") || value.length<=6){
                throw new Error('Password is not secure')
            }
        }
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age:{
        type: Number,
        default: 11,
        validate(value){
            if(value<=10){
                throw new Error('Age must be greater than 10')
            }
        }
    }
})

// const me = new User({
//     name: 'Alex',
//     email: '   alex@gmail.com ',
//     password: 'alex1234',
//     age: 24
// })

// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })

const Task = mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

const newTask = new Task({
    description: 'This is task one.'
})

newTask.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})