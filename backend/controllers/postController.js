const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

require('dotenv').config()
const KEY=process.env.SECRET_KEY

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
            const {userId,email,firstName,lastName,role,pic}=user
            return res.status(200).json({token,user:{userId,email,firstName,lastName,role,pic},message:process.env.SUCCESS_SIGNIN})
        }
        return res.status(422).json({message:process.env.FAILURE_INVALID_INPUT})
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.signUp=(req,res)=>{
    const user=req.user
    if(user.role!=="admin"){
        console.log("Not admin");
        return res.status(403).json({message:process.env.FAILURE_ACCOUNT_CREATION_AUTHORIZATION})
    }
    const {email,firstName,lastName,password,pic}=req.body
    if(!email || !password || password.length<4 || !firstName){
        return res.status(403).json({message:process.env.FAILURE_FIELD_EMPTY_SIGNUP})
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        let success=User.addUser({email,firstName,lastName,password:hashed,pic})
        return success?
        res.status(201).json({user:{userId:success.userId,email,firstName,lastName,pic},message:process.env.SUCCESS_ACCOUNT_CREATED}):
        res.status(403).json({message:process.env.FAILURE_ACCOUNT_CREATION})
    })
    .catch(err=>console.log(err))
}

