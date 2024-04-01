const mongoose= require('mongoose')

const Schema = mongoose.Schema

const trainerSchema = new Schema({
    img:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    center:{
        type:String,
        required:true
    },
    joindate:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum: ['male', 'female', 'prefer not to say']
    },
    martialstatus:{
        type:String,
        required:true
    },

   
    
},{timestamps:true})

module.exports = mongoose.model('trainer',trainerSchema)



