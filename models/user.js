const mongoose=require('mongoose')

mongoose.connect('mongodb://0.0.0.0/test')

const userSchema=mongoose.Schema({
    name:String,
    gender:String,
    age:String,
    username:String,
    contact:String,
    email:String,
    address:String,
})

module.exports=mongoose.model('user', userSchema)