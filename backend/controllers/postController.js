const User=require('../models/user')
const Product=require('../models/product')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

require('dotenv').config()
const KEY=process.env.SECRET_KEY

/**
 * Allows the user to sign in and get a token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.signIn=(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({message:process.env.FAILURE_FIELD_EMPTY})
    }
    let user=User.findByEmail(email)
    if(!user)
        return res.status(422).json({message:process.env.FAILURE_INVALID_INPUT})
    bcrypt.compare(password,user.password)
    .then(doesmatch=>{
        if(doesmatch){
            const token=jwt.sign({_id:user.userId},KEY)
            const {userId,email,firstName,lastName,dob,role,pic,todos}=user
            return res.status(200).json({token,user:{userId,email,firstName,lastName,dob,role,pic,todos},message:process.env.SUCCESS_SIGNIN})
        }
        return res.status(422).json({message:process.env.FAILURE_INVALID_INPUT})
    })
    .catch(err=>{
        console.log(err);
    })
}

/**
 * Allows a user to sign up and get added to list of users
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.signUp=(req,res)=>{
    const user=req.user
    if(user.role!=="admin"){
        console.log("Not admin");
        return res.status(403).json({message:process.env.FAILURE_ACCOUNT_CREATION_AUTHORIZATION})
    }
    const {email,firstName,lastName,password,dob,pic}=req.body
    if(!email || !password || password.length<4 || !firstName || !dob){
        return res.status(403).json({message:process.env.FAILURE_FIELD_EMPTY_SIGNUP})
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        let success=User.addUser({email,firstName,lastName,dob,password:hashed,pic})
        return success?
        res.status(201).json({user:{userId:success.userId,email,firstName,lastName,dob,pic},message:process.env.SUCCESS_ACCOUNT_CREATED}):
        res.status(403).json({message:process.env.FAILURE_ACCOUNT_CREATION})
    })
    .catch(err=>console.log(err))
}

/**
 * admin can add a product to list using Product model
 */
exports.addProduct=(req,res)=>{
    const user=req.user
    if(user.role!=="admin")
        return res.status(403).json({message:process.env.FAILURE_PRODUCT_CREATION_AUTHORIZATION})
    if(!req.body.title || !req.body.price || !req.body.description || !req.body.expiryDate)
        return res.status(422).json({message:process.env.FAILURE_PRODUCT_CREATION_INVALID_DETAILS})
    if(!req.file)
        return res.status(422).json({message:process.env.FAILURE_PRODUCT_CREATION_INVALID_FILE})
    const product=new Product(null,req.body.title,req.body.description,req.body.price,req.file.path.replace("\\","/"),req.body.expiryDate)
    return product.save()?
    res.status(201).json({product:product,message:process.env.SUCCESS_PRODUCT_CREATION}):
    res.status(500).json({message:process.env.FAILURE_PRODUCT_CREATION})
}