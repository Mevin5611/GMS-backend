const express = require('express')

//controller function
const {loginUser,signUpUser}=require('../controllers/userControllers')

const router = express.Router()

// login route
router.post('/login', loginUser)


// signup route
router.post('/signup', signUpUser)


module.exports=router