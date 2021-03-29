const router=require('express').Router()

const getProductController=require('../controllers/getProducts')
const postProductController=require('../controllers/postProducts')
const deleteProductController=require('../controllers/deleteProducts')

router.get('/getCart',getProductController.getCart)

router.post('/postCart',postProductController.postCart)

router.delete('/deleteFromCart',deleteProductController.deleteProductFromCart)

router.get('/getProducts',getProductController.getAllProducts)

router.get('/getProduct/:productId',getProductController.findProductById)

module.exports=router