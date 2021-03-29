require('dotenv').config()

exports.createPost=(req,res,next)=>{
    const {title,content}=req.body
    if(!title || !content){
        const err=new Error("Invalid inputs")
        err.httpStatusCode=422
        throw err
    }
    res.status(201)
    .json({message:process.env.SUCCESS_CREATED_POST,post:{title,content,id:new Date().toISOString()}})
}

