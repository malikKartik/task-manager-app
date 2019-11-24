const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User