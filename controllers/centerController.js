const Center= require('../models/centerModel')
const mongoose = require('mongoose')


// get all workouts

const getcenters = async(req,res)=>{
    /* const user_id = res.user._id */
    
    const centers = await Center.find({}).sort({createdAt:-1})

    res.status(200).json(centers)

}
//get one workout
const getcenter =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such center'})
    }

    const center = await Center.findById(id)

    if(!center){
        return res.status(400).json({error : 'no such center'})
    }

    

    res.status(200).json(center)
}

// create a workouts
const createcenter=async(req,res)=>{
    const {name,address,state,status,country} = req.body
    /* const userid = res.user._id */
    let emptyField = []

    if(!name){
        emptyField.push('name')
    }
    if(!address){
        emptyField.push('address')
    }
    if(!state){
        emptyField.push('state')
    }
    if(!status){
        emptyField.push('status')
    }
    if(!country){
        emptyField.push('country')
    }
    if(emptyField.length >0){
        return res.status(400).json({error :'please fill in the all fields',emptyField})
    }
    
// doc to DB
    try{
        /* const user_id = res.user._id */
        const center =await Center.create({name,address,state,status,country})
        res.status(200).json({center})
        
        
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


// delete a workout 
const deletecenter =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const center = await Center.findByIdAndDelete({_id : id})

    if(!center){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(center)
}


// update a workout
const updatecenter =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const center = await Center.findByIdAndUpdate({_id : id},{
        ...req.body
    })

    if(!center){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(center)
}



module.exports = {
    createcenter,
    getcenter,
    getcenters,
    deletecenter,
    updatecenter
}