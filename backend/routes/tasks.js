const router=require('express').Router()

const putController=require('../controllers/putController')
const requireLogin = require('../middlewares/requireLogin')

router.put('/addTask/:userId',requireLogin,putController.addTask)
router.put('/updateTask/:userId',requireLogin,putController.updateTask)

module.exports=router