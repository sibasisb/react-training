let users=[
    {
        userId:"1",
        email:"siba@gmail.com",
        firstName:"Siba",
        lastName:"Bhattacharjee",
        password:"$2y$12$5jHDg.AEN/1vJ4AtUr4DSuGsYPtJUQyTXUjUg3C/1qluId4Jm8EIW",
        dob:"2004-02-05",
        role:"admin",
        pic:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80"
    },
    {
        userId:"2",
        email:"billy@gmail.com",
        firstName:"Billy",
        lastName:"Milly",
        password:"$2y$12$5jHDg.AEN/1vJ4AtUr4DSuGsYPtJUQyTXUjUg3C/1qluId4Jm8EIW",
        dob:"2004-02-05",
        role:"user",
        pic:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80"
    }
]

module.exports=class User {
    
    static findByEmail(email){
        let x=users.find(u=>u.email===email)
        return x
    }

    static findById(id){
        let x=users.find(u=>u.userId===id)
        return x
    }

    static deleteAccount(userId){
        if(!users.find(u=>u.userId===userId))
            return false
        users=users.filter(user=>user.userId!==userId)
        return true
    }

    static getAllUsers(){
        return users;
    }

    static updateUser(user){
        if(!users.find(u=>u.userId===user.userId))
            return false
        users=users.map(u=>{
            if(u.userId===user.userId)
                return {...u,firstName:user.firstName,lastName:user.lastName,dob:user.dob,password:user.password,pic:user.pic,todos:user.todos}
            return u
        })
        return true
    }

    static addUser(user){
        if(users.find(u=>u.email===user.email))
            return null
        let max=-1 
        users.forEach(u=>{
            max=Number(u.userId)>max?Number(u.userId):max
        })
        let uid=max+1
        const newUser={
            ...user,
            userId:uid.toString(),
            role:"user"
        }
        users.push(newUser)
        return newUser
    }

}