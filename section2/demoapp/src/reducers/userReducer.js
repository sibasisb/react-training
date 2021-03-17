export const initialState=[
    {
        userId:"1",
        username:"siba",
        password:"123",
        isLoggedIn:false
    },
    {
        userId:"2",
        username:"user",
        password:"123",
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