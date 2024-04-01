const Package= require('../models/packageModels')
const mongoose = require('mongoose')


// get all workouts

const getpackages = async(req,res)=>{
    /* const user_id = res.user._id */
    
    const packages = await Package.find({}).sort({createdAt:-1})

    res.status(200).json(packages)

}
//get one workout
const getpackage =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such center'})
    }

    const package = await Package.findById(id)

    if(!package){
        return res.status(400).json({error : 'no such center'})
    }

    

    res.status(200).json(package)
}

// create a workouts
const createpackage=async(req,res)=>{
    const {name,price,center,days,trainingtype} = req.body
    /* const userid = res.user._id */
    let emptyField = []

    if(!name){
        emptyField.push('name')
    }
    if(!price){
        emptyField.push('price')
    }
    if(!center){
        emptyField.push('center')
    }
    if(!days){
        emptyField.push('days')
    }
    if(!trainingtype){
        emptyField.push('trainingtype')
    }
    if(emptyField.length >0){
        return res.status(400).json({error :'please fill in the all fields',emptyField})
    }
    
// doc to DB
    try{
        /* const user_id = res.user._id */
        const package =await Package.create({name,price,center,days,trainingtype})
        res.status(200).json({package})
        
        
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


// delete a workout 
const deletepackage =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const package = await Package.findByIdAndDelete({_id : id})

    if(!package){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(package)
}


// update a workout
const updatepackage =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const package = await Package.findByIdAndUpdate({_id : id},{
        ...req.body
    })

    if(!package){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(package)
}



module.exports = {
    createpackage,
    getpackage,
    getpackages,
    deletepackage,
    updatepackage
}