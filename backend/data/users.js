const bcrypt=require('bcryptjs')

let users=[
    {
        userId:"1",
        email:"siba@gmail.com",
        firstName:"Siba",
        lastName:"Bhattacharjee",
        password:"$2y$12$5jHDg.AEN/1vJ4AtUr4DSuGsYPtJUQyTXUjUg3C/1qluId4Jm8EIW",
        role:"admin",
        pic:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80"
    },
    {
        userId:"2",
        email:"billy@gmail.com",
        firstName:"Billy",
        lastName:"Milly",
        password:"$2y$12$5jHDg.AEN/1vJ4AtUr4DSuGsYPtJUQyTXUjUg3C/1qluId4Jm8EIW",
        role:"user",
        pic:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80"
    }
]

const signup=(user)=>{
    let x=users.find(u=>u.email===user.email)
    if(!x){
        users.add(user)
        return true
    }    
    return false
}

const findByEmail=(email)=>{
    let x=users.find(u=>u.email===email)
    return x
}

const findById=(id)=>{
    let x=users.find(u=>u.userId===id)
    return x
}

const deleteAccount=(userId)=>{
    if(!users.find(u=>u.userId===userId))
        return false
    users=users.filter(user=>user.userId!==userId)
    return true
}

const getAllUsers=()=>{
    return users;
}

module.exports.getAllUsers=getAllUsers
module.exports.findByEmail=findByEmail
module.exports.findById=findById
module.exports.deleteAccount=deleteAccount