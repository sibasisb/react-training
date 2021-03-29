const express=require('express')

const app=express()

require('dotenv').config()

const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop')
const errorController=require('./controllers/error')

app.use(express.json())

app.use('/admin',adminRouter)
app.use('/',shopRouter)

app.use('/',errorController.getError)

app.use((error,req,res,next)=>{
    //redirect to 500 page
    res.status(error.httpStatusCode).json({message:error.message})
})

app.listen(3002)