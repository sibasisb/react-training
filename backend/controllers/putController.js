const User=require('../models/user')
const Product=require('../models/product')

const bcrypt=require('bcryptjs')
require('dotenv').config()

/**
 * Allows admin or the user himself to update the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateUser=(req,res)=>{
    const user=req.user
    const {userId}=req.params
    if(user.role!=="admin" && user.userId!==userId){
        console.log("Not admin and not current  user");
        return res.status(403).json({message:process.env.FAILURE_ACCOUNT_UPDATE_AUTHORIZATION})
    }
    const {firstName,lastName,password,pic}=req.body
    if(!password || password.length<4 || !firstName){
        return res.status(403).json({message:process.env.FAILURE_ACCOUNT_UPDATE_INVALID_INPUT})
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        let success=User.updateUser({userId,firstName,lastName,password:hashed,pic})
        return success?
        res.status(200).json({user:{userId,firstName,lastName,pic},message:process.env.SUCCESS_ACCOUNT_UPDATE}):
        res.status(403).json({message:process.env.FAILURE_ACCOUNT_UPDATE}) 
    })
    .catch(err=>console.log(err))
}

/**
 * Allows the admin to edit the product
 */
exports.editProduct=(req,res)=>{
    const user=req.user
    if(user.role!=="admin")
        return res.status(403).json({message:process.env.FAILURE_PRODUCT_UPDATE_AUTHORIZATION})
    if(!req.params.productId || !req.body.title || !req.body.price || !req.body.description)
        return res.status(422).json({message:process.env.FAILURE_PRODUCT_UPDATE_INVALID_DETAILS})
    if(!req.file)
        return res.status(422).json({message:process.env.FAILURE_PRODUCT_CREATION_INVALID_FILE})
    const product=new Product(req.params.productId,req.body.title,req.body.description,req.body.price,req.file.path)
    return product.save()?
    res.status(201).json({product:product,message:process.env.SUCCESS_PRODUCT_UPDATE}):
    res.status(400).json({message:process.env.FAILURE_PRODUCT_UPDATE})
}