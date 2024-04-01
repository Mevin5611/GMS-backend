const express=require("express")
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/WorkoutControllres')
const requireAuth = require('../middleware/requireAuth')

const router=express.Router()

// require auth for all routes
router.use(requireAuth)

// GET ALL WORKOUTS
router.get('/',getWorkouts)
// GET Single WORKOUTS
router.get('/:id',getWorkout)
// POST A WORKOUTS
router.post('/',createWorkout)
// DELETE A WORKOUTS
router.delete('/:id',deleteWorkout)
// patch A WORKOUTS
router.patch('/:id',updateWorkout)


module.exports=router