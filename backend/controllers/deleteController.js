const User=require('../models/user')
const Product=require('../models/product')

require('dotenv').config()

/**
 * Delete user from list of users using User model
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteUser=(req,res)=>{
    const user=req.user
    const {userId}=req.params
    // if(user.role!=="admin" && user.userId!==userId){
    //     return res.status(403).json({message:process.env.FAILURE_ACCOUNT_DELETION_AUTHORIZATION})
    // }
    return (user.role!=="admin" && user.userId!==userId)?
    res.status(403).json({message:process.env.FAILURE_ACCOUNT_DELETION_AUTHORIZATION}):
    (User.deleteAccount(userId)?
    res.status(200).json({message:process.env.SUCCESS_ACCOUNT_DELETION}):
    res.status(404).json({message:process.env.FAILURE_ACCOUNT_DELETION}))
}

/**
 * Delete product from list of products using Product model 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProduct=(req,res)=>{
    const user=req.user
    if(user.role!=="admin")
        return res.status(403).json({message:process.env.FAILURE_PRODUCT_DELETION_AUTHORIZATION})
    const productId=req.params.productId
    return Product.deleteProduct(productId)?
    res.status(200).json({message:process.env.SUCCESS_PRODUCT_DELETION}):
    res.status(400).json({message:process.env.FAILURE_PRODUCT_DELETION})
}
