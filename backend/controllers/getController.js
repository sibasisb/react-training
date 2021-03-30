require('dotenv').config()

const User=require('../models/user')
const Product=require('../models/product')

/**
 * Fetch all users using User model
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers=(req,res)=>{
    let userList=User.getAllUsers()
    res.json({users:userList,message:process.env.SUCCESS_ALL_USERS_RETRIEVED})
}

/**
 * Find a specific user from the id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.findUserById=(req,res)=>{
    const {userId}=req.params
    let user=User.findById(userId)
    return user?
    res.status(200).json({user:{userId:user.userId,email:user.email,pic:user.pic,firstName:user.firstName,lastName:user.lastName,role:user.role},message:process.env.SUCCESS_USER_FOUND}):
    res.status(404).json({message:process.env.FAILURE_USER_NOT_FOUND})
}

/**
 * Get all products using the Product model
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getAllProducts=(req,res)=>{
    const products= Product.getAll()
    return res.status(200).json({products:products,message:process.env.SUCCESS_GET_ALL_PRODUCTS})
}

/**
 * Find product by id using Product model
 * @param {4} req 
 * @param {*} res 
 * @returns 
 */
exports.findProductById=(req,res)=>{
    if(!req.params.productId)
        return res.status(422).json({message:process.env.FAILURE_INVALID_PRODUCT_ID})
    let product=Product.findProductById(req.params.productId)
    return product?
    res.status(200).json({product:product,message:process.env.SUCCESS_PRODUCT_FOUND}):
    res.status(404).json({message:process.env.FAILURE_PRODUCT_NOT_FOUND})
}