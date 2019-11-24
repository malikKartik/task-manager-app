const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
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


// const newTask = new Task({
//     description: 'This is task one.'
// })

// newTask.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })