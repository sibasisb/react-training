const router=require('express').Router()
const users=require('../data/users')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const requireLogin = require('../middlewares/requireLogin')
require('dotenv').config()
const KEY=process.env.SECRET_KEY

router.get('/users',(req,res)=>{
    let userList=users.getAllUsers()
    res.json({users:userList})
})

router.route('/signin').post((req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({message:"Empty field"})
    }
    let user=users.findByEmail(email)
    if(!user)
        return res.status(422).json({message:"Invald email/password"})
    bcrypt.compare(password,user.password)
    .then(doesmatch=>{
        if(doesmatch){
            const token=jwt.sign({_id:user.userId},KEY)
            const {userId,email,firstName,lastName,role,pic}=user
            return res.status(200).json({token,user:{userId,email,firstName,lastName,role,pic},message:"Successfully signed in!!!"})
        }
        return res.status(422).json({message:"Invald email/password"})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.delete('/:userId',requireLogin,(req,res)=>{
    const user=req.user
    const {userId}=req.params
    if(user.role!=="admin" && user.userId!==userId){
        console.log("Not admin and not current  user");
        return res.status(403).json({message:"Cannot delete account"})
    }
    if(users.deleteAccount(userId))
        return res.status(200).json({message:"Account deleted"})
    console.log("User not present");
    return res.status(403).json({message:"Cannot delete account"})
})

router.put('/:userId',requireLogin,(req,res)=>{
    const user=req.user
    const {userId}=req.params
    if(user.role!=="admin" && user.userId!==userId){
        console.log("Not admin and not current  user");
        return res.status(403).json({message:"Cannot update account"})
    }
    const {firstName,lastName,password,pic}=req.body
    if(!password || password.length<4 || !firstName){
        return res.status(403).json({message:"Invalid password/first name"})
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        let success=users.updateUser({userId,firstName,lastName,password:hashed,pic})
        if(success)
            return res.status(200).json({user:{userId,firstName,lastName,pic},message:"Accout updated"})
        return res.status(403).json({message:"Cannot update account"})
    })
    .catch(err=>console.log(err))
})

router.post('/signup',requireLogin,(req,res)=>{
    const user=req.user
    if(user.role!=="admin"){
        console.log("Not admin");
        return res.status(403).json({message:"Cannot create account"})
    }
    const {email,firstName,lastName,password,pic}=req.body
    if(!email || !password || password.length<4 || !firstName){
        return res.status(403).json({message:"Invalid email/password/first name"})
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        let success=users.addUser({email,firstName,lastName,password:hashed,pic})
        if(success)
            return res.status(201).json({user:{userId:success.userId,email,firstName,lastName,pic},message:"Account created"})
        return res.status(403).json({message:"Cannot create account"})
    })
    .catch(err=>console.log(err))
})

module.exports=router