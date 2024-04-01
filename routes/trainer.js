const express=require("express")
const multer = require('multer');

const {
    createtrainer,
    gettrainer,
    gettrainers,
    deletetrainer,
    updatetrainer
} = require('../controllers/trainerController')
/* const requireAuth = require('../middleware/requireAuth') */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router=express.Router()



// require auth for all routes
/* router.use(requireAuth) */

// GET ALL trainer
router.get('/',gettrainers)
// GET Single trainer
router.get('/:id',gettrainer)
// POST A trainer
router.post('/', upload.single('img'), createtrainer);
// DELETE A trainer
router.delete('/:id',deletetrainer)
// patch A trainer
router.patch('/:id' , upload.single('img'),updatetrainer)


module.exports=router