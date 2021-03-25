const router=require('express').Router()

const productController=require('../controllers/products')

router.get('/',productController.getAllProducts)

router.get('/:productId',productController.findProductById)

module.exports=router