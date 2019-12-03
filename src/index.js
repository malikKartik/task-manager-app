const express = require('express')

// Starting mongodb
require('./db/mongoose')

// Importing routes
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

//maintainance middle ware
// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently in maintainance mode')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log('Server started on port'+port)
})


// Testing bcrypt
// const bcrypt = require('bcryptjs')

// const myFunction = async () =>{
//     const password = 'Red1234'
//     const hashedpasswored = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedpasswored)

//     const isMatch = await bcrypt.compare('Red1234',hashedpasswored)
//     console.log(isMatch)
// }

// myFunction()


//Testing JWT
// const jwt = require('jsonwebtoken')

// const myFunction = async()=>{
//     const token = jwt.sign({_id:'abc123'},'makethingsbetter',{expiresIn:'30 second'})
//     console.log(token)

//     const data = jwt.verify(token,'makethingsbetter')
//     console.log(data)
// }

// myFunction()