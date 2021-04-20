const jwt=require('jsonwebtoken');
const User=require('../models/user')
require('dotenv').config();
const KEY=process.env.SECRET_KEY;

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        req.isAuth=false
        return next()
    }
    const token=authorization.replace('Bearer ','');
    jwt.verify(token,KEY,(error,payload)=>{
        if(error){
            req.isAuth=false
            return next()
        }
        const {_id}=payload;
        let usr=User.findById(_id)
        if(!usr){
            req.isAuth=false
            return next()
        }
        req.user=usr
        req.isAuth=true
        next()
    });
    
}