const Product=require('../models/product')
const Cart=require('../models/cart')

require('dotenv').config()

/**
 * Find product based on id from file
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.findProductById=(req,res,next)=>{
    const {productId}=req.params
    Product.findProductById(productId,(product)=>{
        product?
        res.status(200).json({product:product,message:process.env.SUCCESS_FIND_PRODUCT_BY_ID}):
        res.status(404).json({message:process.env.FAILURE_FIND_PRODUCT_BY_ID})
    })
}

/**
 * Get all products from catalog
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getAllProducts=(req,res,next)=>{
    Product.getAll((products)=>{
        res.status(200).json({products:products,message:process.env.SUCCESS_GET_ALL_PRODUCTS_FROM_CATALOG})
    })
}

/**
 * Get the entire cart
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getCart=(req,res,next)=>{
    Cart.getAllFromCart(cart=>{
        Product.getAll(products=>{
            let cartProducts=[]
            for(product of products){
                const cartProductData=cart.products.find(prod=>prod.id===product.id)
                if(cartProductData)
                    cartProducts.push({productData:product,qty:cartProductData.qty})   
            }
            res.status(200).json({cart:{productList:cartProducts,totalPrice:cart.totalPrice},message:process.env.SUCCESS_RETRIEVE_FROM_CART})
        })
    })
}

