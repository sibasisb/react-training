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
