const express=require('express')

const app=express()

const feedRouter=require('./routes/feed')

app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next()
})

app.use('/feed',feedRouter)

app.use((err,req,res,next)=>{
    res.status(err.httpStatusCode).json({message:err.message})
})

app.listen(3002,()=>{
    console.log("Running on port 3002")
})