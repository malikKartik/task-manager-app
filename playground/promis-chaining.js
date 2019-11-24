require('../src/db/mongoose')

const Task = require('../src/models/task')
Task.deleteOne({_id:"5dd97f24c2f40b06300014c3"}).then((result)=>{
    return Task.countDocuments({completed:"false"})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})