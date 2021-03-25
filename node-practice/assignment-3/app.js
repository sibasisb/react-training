const express=require('express')
const path=require('path')
const router=require('./routes/routes')
const app=express()

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/',router)
app.listen(3002)
