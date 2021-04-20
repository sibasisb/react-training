const express=require('express')
const cors=require('cors')
const path=require('path')
const multer=require('multer')
const {v4: uuidv4 }=require('uuid')
const {graphqlHTTP}=require('express-graphql')
const graphqlSchema=require('./graphql/schema')
const graphqlResolver=require('./graphql/resolvers')
const errorController=require('./controllers/error')
const requireLogin = require('./middlewares/requireLogin')

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

app.use(requireLogin)

const clearImage=filePath=>{
    filePath=path.join(__dirname,'..',filePath)
    fs.unlink(filePath,err=>console.log(err))
}

app.use('/post-image',(req,res,next)=>{
    if(!req.isAuth){
        return res.status(401).json({message:process.env.FAILURE_AUTHENTICATION})
    }
    return req.file? 
    res.status(201).json({message:"File stored",filePath:req.file.path.replace("\\","/")}):
    res.status(201).json({message:"File already present",filePath:req.body.imageUrl})
})

app.use('/graphql',graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolver,
    graphiql:true,
    customFormatErrorFn(err){
        if(!err.originalError)
            return err;
        return {
            data:err.originalError.data,
            code:err.originalError.code,
            message:err.originalError.message
        }
    }
}))

app.use(errorController.getError)

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})