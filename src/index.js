const express = require('express')

// Starting mongodb
require('./db/mongoose')

// Importing models
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',async (req,res)=>{
    const user = new User(req.body)
    
    // performing the needful operation using promises for this remove the async from up above
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400)
    //     res.send(e)
    // })

    //perfroming the needful operation using async and await
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
    
    
})

app.get('/users/:id',async (req,res)=>{
    
    
    // User.findOne({
    //     _id: req.params.id
    // }).then((user)=>{
    //     if(!user){
    //         return res.status(404).send('User not found!')
    //     }
    //     res.send(user)
    // }).catch(()=>{
    //     res.status(400).send('Bad request')
    // })

    try{
        const user = await User.findOne({_id: req.params.id})
        if(!user){
            return res.status(404).send('User not found')
        }
        res.status(200).send(user)
    } catch(e){
        res.status(400).send('Bad request')
    }
})

app.get('/users',async (req,res)=>{

    // User.find().then((users)=>{
    //     res.send(users)
    // }).catch(()=>{
    //     res.status(500).send()
    // })

    try{
        const users = await User.find()
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
    
})

app.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
        
        if(!user){
            return res.status(404).send('No user')
        }  
        res.send(user)
    } catch(e){
        res.status(500).send("something is not right")
    }
})

app.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }

    // task.save().then((result)=>{
    //     res.status(201).send(result)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

app.get('/tasks',async (req,res)=>{
    
    try{
        const tasks = await Task.find()
        res.send(tasks)
    } catch(e){
        res.status(400).send('No data found')
    }
    
    // Task.find().then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send('bad requests')
    // })
})

app.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    // Task.findOne({
    //     _id
    // }).then((task)=>{
    //     if(!task){
    //         return res.status(404).send('Task not found')
    //     }
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
    try{
        const task = await Task.findOne({_id})
        if(!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
    
})

app.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send("something is not right")
    }
})

app.listen(port, ()=>{
    console.log('Server started on port'+port)
})