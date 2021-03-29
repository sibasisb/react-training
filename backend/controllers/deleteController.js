const User=require('../models/user')

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