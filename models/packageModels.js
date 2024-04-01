const mongoose= require('mongoose')

const Schema = mongoose.Schema

const packageSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    center:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    trainingtype:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('package',packageSchema)



