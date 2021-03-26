const router=require('express').Router()

const productController=require('../controllers/products')

router.get('/getCart',productController.getCart)

router.post('/postCart',productController.postCart)

router.delete('/deleteFromCart',productController.deleteProductFromCart)

router.get('/getProducts',productController.getAllProducts)

router.get('/getProduct/:productId',productController.findProductById)

module.exports=router