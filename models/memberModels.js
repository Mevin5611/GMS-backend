const mongoose= require('mongoose')

const Schema = mongoose.Schema

const memberSchema = new Schema({
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
        required:true,
        unique: true,
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
        required:true
    },
    martialstatus:{
        type:String,
        required:true
    },
    pack:{
        type:String,
        required:true
    },
    offerprice:{
        type:Number,
        required:true
    },
    startdate:{
        type:Date,
        required:true
    },
    paidamount:{
        type:Number,
        required:true
    },
    dues:{
        type:Number,
        required:true
    },
    paymentdate:{
        type:Date,
        required:true
    },
    paymentmethod:{
        type:String,
        required:true
    },
    expiredate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('member',memberSchema)



