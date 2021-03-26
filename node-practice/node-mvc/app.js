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

app.listen(3002)