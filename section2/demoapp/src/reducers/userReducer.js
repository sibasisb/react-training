export const initialState=[
    {
        userId:"1",
        username:"siba",
        firstName:"Sibasis",
        lastName:"Bhattacharjee",
        password:"123",
        pic:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80",
        isLoggedIn:false
    },
    {
        userId:"2",
        username:"user",
        firstName:"Billy",
        lastName:"Milly",
        password:"123",
        pic:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80",
        isLoggedIn:false
    }
]

export const userReducer=(state,action)=>{
    switch(action.type){
        case "USER_ADD": 
            state.push(action.payload.user)
            break;            
        case "USER_UPDATE": 
            state=state.map(user=>{
                if(user.userId===action.payload.user.userId){
                    return action.payload.user
                }
                return user
            })
            console.log(state);
            break;
        case "USER_DELETE": 
            state=state.filter(user=>user.userId!==action.payload.user.userId)
            break;
        default: return state;
    }
    return state;
}

export default userReducer