const jwt=require('jsonwebtoken');
const users=require('../data/users')
require('dotenv').config();
const KEY=process.env.SECRET_KEY;

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization)
        return res.status(401).json({error:'You are not logged in'});
    const token=authorization.replace('Bearer ','');
    jwt.verify(token,KEY,(error,payload)=>{
        if(error)
            return res.status(401).json({error:'You are not logged in'});
        
        const {_id}=payload;
        let usr=users.findById(_id)
        if(usr){
            req.user=usr
            next()
        }
        else{
            return res.status(401).json({error:'You are not logged in'});
        }
    });
    
}