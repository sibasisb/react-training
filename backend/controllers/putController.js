const User=require('../models/user')
const bcrypt=require('bcryptjs')

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