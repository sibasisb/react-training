require('dotenv').config()

exports.getPosts=(req,res,next)=>{
    res.status(200).json({posts:[{id:1,title:"My first post",content:"This is a dummy post"}],message:process.env.SUCCESS_RETRIEVED_POST})
}