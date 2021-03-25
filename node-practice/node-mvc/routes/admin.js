const router=require('express').Router()

const productController=require('../controllers/products') 

router.post('/addProduct',productController.addProduct)

router.get('/getAll',productController.getAllProducts)

module.exports=router