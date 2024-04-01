const express=require("express")

const {
    createpackage,
    getpackage,
    getpackages,
    deletepackage,
    updatepackage
} = require('../controllers/packageControllers')
/* const requireAuth = require('../middleware/requireAuth') */

const router=express.Router()

// require auth for all routes
/* router.use(requireAuth) */

// GET ALL center
router.get('/',getpackages)
// GET Single center
router.get('/:id',getpackage)
// POST A center
router.post('/',createpackage)
// DELETE A center
router.delete('/:id',deletepackage)
// patch A center
router.patch('/:id',updatepackage)


module.exports=router