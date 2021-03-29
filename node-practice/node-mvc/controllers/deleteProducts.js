const Product=require('../models/product')
const Cart=require('../models/cart')

require('dotenv').config()

/**
 * Delete a product from catalog
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteProduct=(req,res,next)=>{
    const id=req.body.id
    Product.deleteProduct(id,(result)=>{
        result?
        res.status(201).json({message:process.env.SUCCESS_DELETE_FROM_CATALOG}):
        res.status(404).json({message:process.env.FAILURE_DELETE_FROM_CATALOG})
    })
}

/**
 * Delete a product from cart
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteProductFromCart=(req,res,next)=>{
    const id=req.body.productId
    Product.findProductById(id,(product)=>{
        product?
        Cart.deleteProductFromCart(id,product.price,(deleted)=>{
            deleted?
            res.status(201).json({message:process.env.SUCCESS_DELETE_FROM_CART}):
            res.status(404).json({message:process.env.FAILURE_DELETE_FROM_CART})
        }):
        res.status(404).json({message:process.env.FAILURE_FIND_PRODUCT_BY_ID})
    })
}