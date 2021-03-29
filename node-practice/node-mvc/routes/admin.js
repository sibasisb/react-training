const router=require('express').Router()

const getProductController=require('../controllers/getProducts')
const postProductController=require('../controllers/postProducts')
const deleteProductController=require('../controllers/deleteProducts') 
const updateProductController=require('../controllers/updateProducts') 

router.post('/addProduct',postProductController.addProduct)

router.get('/getAllProducts',getProductController.getAllProducts)

router.put('/editProduct',updateProductController.editProduct)

router.delete('/deleteProduct',deleteProductController.deleteProduct)

module.exports=router