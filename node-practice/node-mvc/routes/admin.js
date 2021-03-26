const router=require('express').Router()

const productController=require('../controllers/products') 

router.post('/addProduct',productController.addProduct)

router.get('/getAllProducts',productController.getAllProducts)

router.put('/editProduct',productController.editProduct)

router.delete('/deleteProduct',productController.deleteProduct)

module.exports=router