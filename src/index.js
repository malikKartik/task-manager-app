const express = require('express')

// Starting mongodb
require('./db/mongoose')

// Importing models
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })
})

app.get('/users/:id',(req,res)=>{
    User.findOne({
        _id: req.params.id
    }).then((user)=>{
        if(!user){
            return res.status(404).send('User not found!')
        }
        res.send(user)
    }).catch(()=>{
        res.status(400).send('Bad request')
    })
})

app.get('/users',(req,res)=>{
    User.find().then((users)=>{
        res.send(users)
    }).catch(()=>{
        res.status(500).send()
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then((result)=>{
        res.status(201).send(result)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/tasks',(req,res)=>{
    Task.find().then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send('bad requests')
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    Task.findOne({
        _id
    }).then((task)=>{
        if(!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    }).catch(()=>{
        res.status(500).send()
    })
})
app.listen(port, ()=>{
    console.log('Server started on port'+port)
})