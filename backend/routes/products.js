const router=require('express').Router()

const getController=require('../controllers/getController')
const postController=require('../controllers/postController')
const putController=require('../controllers/putController')
const deleteController=require('../controllers/deleteController')
const requireLogin = require('../middlewares/requireLogin')

router.get('/getAllProducts',requireLogin,getController.getAllProducts)

router.get('/getProduct/:productId',requireLogin,getController.findProductById)

router.post('/addProduct',requireLogin,postController.addProduct)

router.put('/editProduct/:productId',requireLogin,putController.editProduct)

router.delete('/deleteProduct/:productId',requireLogin,deleteController.deleteProduct)

module.exports=router