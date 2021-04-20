export const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    token:localStorage.getItem("token")?localStorage.getItem("token"):null,
    usersList:undefined,
    productsList:undefined,
    currentUserTodos:undefined
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
        case "FETCH_USERS": 
            return {
                ...state,
                usersList:action.payload.usersList
            }
        case "FETCH_PRODUCTS": 
            return {
                ...state,
                productsList:action.payload.productsList
            }
        case "FETCH_USER_TODOS":
            return {
                ...state,
                currentUserTodos:action.payload.currentUserTodos
            }
        case "UPDATE_USER_TODOS":
            return {
                ...state,
                currentUserTodos:action.payload.currentUserTodos
            }
        default: return state;
    }
}

export default userReducer