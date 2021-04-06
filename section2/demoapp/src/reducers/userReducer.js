export const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    token:localStorage.getItem("token")?localStorage.getItem("token"):null
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
        case "USER_UPDATE": 
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                ...state,
                user:action.payload.user
            }
        default: return state;
    }
}

export default userReducer