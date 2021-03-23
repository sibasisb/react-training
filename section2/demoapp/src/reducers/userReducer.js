export const initialState={
    user:null,
    token:null
}

export const userReducer=(state,action)=>{
    switch(action.type){
        case "USER_LOGIN": 
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                user:action.payload.user,
                token:action.payload.token
            }            
        case "USER_LOGOUT": 
            localStorage.clear()
            return {
                user:null,
                token:null
            }
        default: return state;
    }
}

export default userReducer