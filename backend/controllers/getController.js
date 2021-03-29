require('dotenv').config()

const User=require('../models/user')

exports.getAllUsers=(req,res)=>{
    let userList=User.getAllUsers()
    res.json({users:userList,message:process.env.SUCCESS_ALL_USERS_RETRIEVED})
}

exports.findUserById=(req,res)=>{
    const {userId}=req.params
    let user=User.findById(userId)
    return user?
    res.status(200).json({user:{userId:user.userId,email:user.email,pic:user.pic,firstName:user.firstName,lastName:user.lastName,role:user.role},message:process.env.SUCCESS_USER_FOUND}):
    res.status(404).json({message:process.env.FAILURE_USER_NOT_FOUND})
}