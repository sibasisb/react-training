const User=require('../models/user')
const Product=require('../models/product')

const bcrypt=require('bcryptjs')
require('dotenv').config()

/**
 * Allows admin or the user himself to update the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateUser=(req,res)=>{
    const user=req.user
    const {userId}=req.params
    if(user.role!=="admin" && user.userId!==userId){
        console.log("Not admin and not current  user");
        return res.status(403).json({message:process.env.FAILURE_ACCOUNT_UPDATE_AUTHORIZATION})
    }
    const {firstName,lastName,password,dob,pic}=req.body
    if(!password || password.length<4 || !firstName || !dob){
        return res.status(403).json({message:process.env.FAILURE_ACCOUNT_UPDATE_INVALID_INPUT})
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        let success=User.updateUser({userId,firstName,lastName,dob,password:hashed,pic})
        return success?
        res.status(200).json({user:{userId,firstName,lastName,dob,pic},message:process.env.SUCCESS_ACCOUNT_UPDATE}):
        res.status(403).json({message:process.env.FAILURE_ACCOUNT_UPDATE}) 
    })
    .catch(err=>console.log(err))
}

/**
 * Allows the admin to edit the product
 */
exports.editProduct=(req,res)=>{
    const user=req.user
    if(user.role!=="admin")
        return res.status(403).json({message:process.env.FAILURE_PRODUCT_UPDATE_AUTHORIZATION})
    if(!req.params.productId || !req.body.title || !req.body.price || !req.body.description || !req.body.expiryDate)
        return res.status(422).json({message:process.env.FAILURE_PRODUCT_UPDATE_INVALID_DETAILS})
    let imageUrl=req.file?req.file.path:null
    imageUrl=imageUrl?imageUrl.replace("\\","/"):null
    const product=new Product(req.params.productId,req.body.title,req.body.description,req.body.price,imageUrl,req.body.expiryDate)
    return product.save()?
    res.status(201).json({product:product,message:process.env.SUCCESS_PRODUCT_UPDATE}):
    res.status(400).json({message:process.env.FAILURE_PRODUCT_UPDATE})
}

/**
 * Allows user to add a task
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.addTask=(req,res)=>{
    const usr=req.user
    const {userId}=req.params
    if(usr.userId!==userId){
        return res.status(403).json({message:process.env.FAILURE_TASK_ADD_AUTHORIZATION})
    }
    const {title,description}=req.body
    if(!title || !description){
        return res.status(421).json({message:process.env.FAILURE_INVALID_TASK_FIELDS})
    }
    let user=User.findById(userId)
    if(!user)
        return res.status(404).json({message:process.env.FAILURE_USER_NOT_FOUND})
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
    res.status(200).json({message:process.env.SUCCESS_TASK_ADD}):
    res.status(403).json({message:process.env.FAILURE_TASK_ADD})
}

/**
 * Allows user to update a task
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 exports.updateTask=(req,res)=>{
    const usr=req.user
    const {userId}=req.params
    if(usr.userId!==userId){
        return res.status(403).json({message:process.env.FAILURE_TASK_UPDATE_AUTHORIZATION})
    }
    const {id,title,description}=req.body
    if(!id || !title || !description){
        return res.status(421).json({message:process.env.FAILURE_INVALID_TASK_FIELDS})
    }
    let user=User.findById(userId)
    if(!user)
        return res.status(404).json({message:process.env.FAILURE_USER_NOT_FOUND})
    let todos=user.todos?user.todos:[]
    todos=todos.map(todo=>{
        return todo.id===id?
        {id,title,description,unchecked:req.body.unchecked}:
        todo
    })
    let success=User.updateUser({...user,todos:todos})
    return success?
    res.status(200).json({message:process.env.SUCCESS_TASK_UPDATE}):
    res.status(403).json({message:process.env.FAILURE_TASK_UPDATE})
}