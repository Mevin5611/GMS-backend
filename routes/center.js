const express=require("express")

const {
    createcenter,
    getcenter,
    getcenters,
    deletecenter,
    updatecenter
} = require('../controllers/centerController')
/* const requireAuth = require('../middleware/requireAuth') */

const router=express.Router()

// require auth for all routes
/* router.use(requireAuth) */

// GET ALL center
router.get('/',getcenters)
// GET Single center
router.get('/:id',getcenter)
// POST A center
router.post('/',createcenter)
// DELETE A center
router.delete('/:id',deletecenter)
// patch A center
router.patch('/:id',updatecenter)


module.exports=router