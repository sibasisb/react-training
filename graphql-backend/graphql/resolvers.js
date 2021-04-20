require('dotenv').config()

const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const User=require('../models/user')
const Product=require('../models/product')
const KEY=process.env.SECRET_KEY

module.exports={
    users:({},req)=>{
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        let userList=User.getAllUsers()
        return userList;
    },
    user:({userId},req)=>{
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        let user=User.findById(userId)
        return user?
        {user:{userId:user.userId,email:user.email,pic:user.pic,firstName:user.firstName,lastName:user.lastName,dob:user.dob,role:user.role,todos:user.todos},message:process.env.SUCCESS_USER_FOUND}:
        {message:process.env.FAILURE_USER_NOT_FOUND}
    },
    products:({},req)=>{
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        const products= Product.getAll()
        return products
    },
    product:({productId},req)=>{
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        let product=Product.findProductById(productId)
        return product?
        {product:product,message:process.env.SUCCESS_PRODUCT_FOUND}:
        {message:process.env.FAILURE_PRODUCT_NOT_FOUND}
    },
    createUser:async function(params,req){
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        const user=req.user
        if(user.role!=="admin"){
            const error=new Error(process.env.FAILURE_ACCOUNT_CREATION_AUTHORIZATION)
            error.code=403
            throw error
        }
        const {email,firstName,lastName,password,dob,pic}=params.userInput
        const errors=[]
        if(!validator.isEmail(email)){
            errors.push({
                message:"Email is invalid"
            })
        }

        if(validator.isEmpty(password) || !validator.isLength(password,{min:4}))
        {
            errors.push({
                message:"Password is too short"
            })
        }

        if(validator.isEmpty(dob) || !validator.isLength(dob,{min:8,max:10}))
        {
            errors.push({
                message:"Date invalid"
            })
        }

        if(validator.isEmpty(firstName) || !validator.isLength(firstName,{min:3}))
        {
            errors.push({
                message:"First name invalid"
            })
        }

        if(errors.length>0){
            const error=new Error("Invalid input")
            error.code=422
            error.data=errors
            throw error
        }

        const hashed=await bcrypt.hash(password,12)
        let success=User.addUser({email,firstName,lastName,dob,password:hashed,pic})
        return success?
        {statusCode:"201",message:process.env.SUCCESS_ACCOUNT_CREATED}:
        {message:process.env.FAILURE_ACCOUNT_CREATION}
    },
    signin:async function({email,password}){
        const errors=[]
        if(!validator.isEmail(email)){
            errors.push({
                message:process.env.FAILURE_INVALID_INPUT
            })
        }

        if(validator.isEmpty(password) || !validator.isLength(password,{min:4}))
        {
            errors.push({
                message:process.env.FAILURE_INVALID_INPUT
            })
        }

        let user=User.findByEmail(email)
        if(!user)
            errors.push({
                message:process.env.FAILURE_INVALID_INPUT
            })

        if(errors.length>0){
            const error=new Error(process.env.FAILURE_INVALID_INPUT)
            error.data=errors
            error.code=422
            throw error
        }

        const doesMatch=await bcrypt.compare(password,user.password)
        
        if(!doesMatch){
            const error=new Error(process.env.FAILURE_INVALID_INPUT)
            error.code=403
            throw error
        }

        const token=jwt.sign({_id:user.userId},KEY)
        const {userId,firstName,lastName,dob,role,pic,todos}=user
        return {token,user:{userId,email,firstName,lastName,dob,role,pic,todos},message:process.env.SUCCESS_SIGNIN}
    },
    deleteUser:({userId},req)=>{
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        const user=req.user
        if(user.role!=="admin" && user.userId!==userId){
            const error=new Error(process.env.FAILURE_ACCOUNT_DELETION_AUTHORIZATION)
            error.code=403
            throw error
        }
        
        return User.deleteAccount(userId)?
        {statusCode:"200",message:process.env.SUCCESS_ACCOUNT_DELETION}:
        {message:process.env.FAILURE_ACCOUNT_DELETION}
    },
    updateUser:async function({userInfo},req){
        const {userId,firstName,lastName,password,dob,pic}=userInfo
        const errors=[]

        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }

        const user=req.user
        if(user.role!=="admin" && user.userId!==userId){
            console.log("Not admin and not current  user");
            return {message:process.env.FAILURE_ACCOUNT_UPDATE_AUTHORIZATION}
        }

        if(validator.isEmpty(userId)){
            errors.push({
                message:"Id empty"
            })
        }

        if(validator.isEmpty(password) || !validator.isLength(password,{min:4}))
        {
            errors.push({
                message:"Password is too short"
            })
        }

        if(validator.isEmpty(dob) || !validator.isLength(dob,{min:8,max:10}))
        {
            errors.push({
                message:"Date invalid"
            })
        }

        if(validator.isEmpty(firstName) || !validator.isLength(firstName,{min:3}))
        {
            errors.push({
                message:"First name invalid"
            })
        }

        if(errors.length>0){
            const error=new Error("Invalid input")
            error.code=422
            error.data=errors
            throw error
        }
        const hashed=await bcrypt.hash(password,12)
        let success=User.updateUser({userId,firstName,lastName,dob,password:hashed,pic})
        return success?
        {user:{userId,firstName,lastName,dob,pic},message:process.env.SUCCESS_ACCOUNT_UPDATE}:
        {message:process.env.FAILURE_ACCOUNT_UPDATE} 
        
    },
    createProduct:({productInput},req)=>{
        if(!req.isAuth){
            const error=new Error(process.env.FAILURE_AUTHENTICATION)
            error.code=401
            throw error
        }
        const {title,price,description,expiryDate,imageUrl}=productInput
        
        if(validator.isEmpty(title) || validator.isEmpty(price) || validator.isEmpty(description) || validator.isEmpty(expiryDate)){
            const error=new Error(process.env.FAILURE_PRODUCT_CREATION_INVALID_DETAILS)
            error.statusCode=422
            throw error
        }
        if(validator.isEmpty(imageUrl)){
            const error=new Error(process.env.FAILURE_PRODUCT_CREATION_INVALID_FILE)
            error.statusCode=422
            throw error
        }
        
        const product=new Product(null,title,description,price,imageUrl,expiryDate)
        return product.save()?
        {product:product,message:process.env.SUCCESS_PRODUCT_CREATION}:
        {message:process.env.FAILURE_PRODUCT_CREATION}
    },
    editProduct:({productInput},req)=>{
        const user=req.user
        if(user.role!=="admin"){
            const error=new Error(process.env.FAILURE_PRODUCT_UPDATE_AUTHORIZATION)
            error.code=401
            throw error
        }
        const {productId,title,price,description,expiryDate,imageUrl}=productInput
        if(validator.isEmpty(productId) || validator.isEmpty(title) || validator.isEmpty(price) || validator.isEmpty(description) || validator.isEmpty(expiryDate)){
            const error=new Error(process.env.FAILURE_PRODUCT_UPDATE_INVALID_DETAILS)
            error.code=422
            throw error
        }
        let newImageUrl=imageUrl==="undefined"?null:imageUrl
        const product=new Product(productId,title,description,price,newImageUrl,expiryDate)
        return product.save()?
        {product:product,message:process.env.SUCCESS_PRODUCT_UPDATE}:
        {message:process.env.FAILURE_PRODUCT_UPDATE}
    },
    deleteProduct:({productId},req)=>{
        const user=req.user
        if(user.role!=="admin"){
            const error=new Error(process.env.FAILURE_PRODUCT_DELETION_AUTHORIZATION)
            error.code=403
            throw error
        }

        return Product.deleteProduct(productId)?
        {statusCode:"200",message:process.env.SUCCESS_PRODUCT_DELETION}:
        {message:process.env.FAILURE_PRODUCT_DELETION}
    },
    createTask:({taskInput},req)=>{
        const usr=req.user
        const userId=usr.userId
        const {title,description}=taskInput
        if(!usr || usr.userId!==userId){
            const error=new Error(process.env.FAILURE_TASK_ADD_AUTHORIZATION)
            error.code=403
            throw error
        }

        if(validator.isEmpty(title) || validator.isEmpty(description)){
            const error=new Error(process.env.FAILURE_INVALID_TASK_FIELDS)
            error.code=421
            throw error
        }

        let user=User.findById(userId)
        if(!user){
            const error=new Error(process.env.FAILURE_USER_NOT_FOUND)
            error.code=404
            throw error
        }

        let todos=user.todos?user.todos:[]
        let maxId=0
        todos.forEach(todo=>maxId=todo.id>maxId?todo.id:maxId)
        const todo={
            id:maxId+1,
            title,
            description
        }

        let success=User.updateUser({...user,todos:[...todos,todo]})
        return success?
        {statusCode:"201",message:process.env.SUCCESS_TASK_ADD}:
        {message:process.env.FAILURE_TASK_ADD}
    },
    editTask:({taskInput},req)=>{
        const usr=req.user
        const userId=usr.userId
        const {id,title,description,unchecked}=taskInput
        if(!usr || usr.userId!==userId){
            const error=new Error(process.env.FAILURE_TASK_ADD_AUTHORIZATION)
            error.code=403
            throw error
        }

        if(!id || validator.isEmpty(title) || validator.isEmpty(description)){
            const error=new Error(process.env.FAILURE_INVALID_TASK_FIELDS)
            error.code=421
            throw error
        }

        let user=User.findById(userId)
        if(!user){
            const error=new Error(process.env.FAILURE_USER_NOT_FOUND)
            error.code=404
            throw error
        }

        let todos=user.todos?user.todos:[]
        todos=todos.map(todo=>{
            return todo.id===id?
            {id,title,description,unchecked:unchecked}:
            todo
        })
        const updatedUser={...user,todos:todos}
        let success=User.updateUser(updatedUser)
        return success?
        {statusCode:"200",message:process.env.SUCCESS_TASK_UPDATE}:
        {message:process.env.FAILURE_TASK_UPDATE}
    }
}

