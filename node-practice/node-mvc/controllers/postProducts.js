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
    if(!req.body.title || !req.body.price){
        const error=new Error("Invalid inputs")
        error.httpStatusCode=422
        throw error
    }
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
    if(!id){
        const error=new Error("Invalid inputs")
        error.httpStatusCode=422
        throw error
    }
    Product.findProductById(id,(product)=>{
        if(product){
            Cart.addToCart(id,product.price)
            return res.status(201).json({message:process.env.SUCCESS_ADD_TO_CART})
        }
        res.status(404).json({message:process.env.FAILURE_FIND_PRODUCT_BY_ID})
    })
}

