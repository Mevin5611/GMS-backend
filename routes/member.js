const express=require("express")
const multer = require('multer');

const {
    createmember,
    getmember,
    getmembers,
    deletemember,
    updatemember
    
} = require('../controllers/memberControllers')

/* const requireAuth = require('../middleware/requireAuth') */

const router=express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// require auth for all routes
/* router.use(requireAuth) */

// GET ALL member
router.get('/',getmembers)
// GET Single member
router.get('/:id',getmember)
// POST A member
router.post('/', upload.single('img'),createmember)
// DELETE A member
router.delete('/:id',deletemember)
// patch A member
router.patch('/:id', upload.single('img'),updatemember)




module.exports=router