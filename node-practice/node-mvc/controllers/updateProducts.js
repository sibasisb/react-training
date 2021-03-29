const Product=require('../models/product')
const Cart=require('../models/cart')

require('dotenv').config()

/**
 * Update a product in catalog
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.editProduct=(req,res,next)=>{
    const prod=new Product(req.body.title,req.body.id,req.body.price)
    Product.findProductById(prod.id,product=>{
        product?
        prod.save((edited)=>{
            return edited?
            res.status(200).json({message:process.env.SUCCESS_EDIT_TO_CATALOG}):
            res.status(401).json({message:process.env.FAILURE_EDIT_TO_CATALOG})
        }):
        res.status(404).json({message:process.env.FAILURE_FIND_PRODUCT_BY_ID})
    })
}