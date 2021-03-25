const router=require('express').Router()

const productController=require('../controllers/products')

router.get('/',productController.getAllProducts)

module.exports=router