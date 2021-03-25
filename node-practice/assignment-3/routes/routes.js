const router=require('express').Router()
const path=require('path')
const root=require('../helper/path')

router.get('/',(req,res)=>{
    res.sendFile(path.join(root,'views','index.html'))
})

router.get('/users',(req,res)=>{
    res.sendFile(path.join(root,'views','users.html'))
})

module.exports=router