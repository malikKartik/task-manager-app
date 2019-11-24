require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')
// Task.deleteOne({_id:"5dd97f24c2f40b06300014c3"}).then((result)=>{
//     return Task.countDocuments({completed:"false"})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount("5dd980e2cb54731a544dccdc",22).then((result)=>{
    console.log(result)
})