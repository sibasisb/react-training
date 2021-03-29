const Product=require('../models/product')
const Cart=require('../models/cart')

require('dotenv').config()

/**
 * Add product to catalog
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.addProduct=(req,res,next)=>{
    const product=new Product(req.body.title,null,req.body.price)
    product.save((added)=>{
        return added?
        res.status(201).json({message:process.env.SUCCESS_ADD_TO_CATALOG}):
        res.status(401).json({message:process.env.FAILURE_ADD_TO_CATALOG})
    })
}

/**
 * Add item to cart 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.postCart=(req,res,next)=>{
    const id=req.body.productId
    Product.findProductById(id,(product)=>{
        if(product){
            Cart.addToCart(id,product.price)
            return res.status(201).json({message:process.env.SUCCESS_ADD_TO_CART})
        }
        res.status(404).json({message:process.env.FAILURE_FIND_PRODUCT_BY_ID})
    })
}

