const express=require('express')
const cors=require('cors')
const path=require('path')
const multer=require('multer')
const {v4: uuidv4 }=require('uuid')

const authRouter=require('./routes/auth')
const productRouter=require('./routes/products')
const errorController=require('./controllers/error')

const PORT=process.env.port || 3001

const app=express()

const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'images')
    },
    filename:(req,file,callback)=>{
        callback(null,uuidv4())
    }   
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        callback(null,true)
    }
    else{
        callback(null,false)
    }
}

app.use(cors())
app.use(express.json())
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
app.use('/images',express.static(path.join(__dirname,'images')))

app.use('/auth',authRouter)
app.use('/products',productRouter)

app.use(errorController.getError)

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})