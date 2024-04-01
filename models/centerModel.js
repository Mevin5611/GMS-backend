const mongoose= require('mongoose')

const Schema = mongoose.Schema

const centerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('center',centerSchema)



