export const getHeader=()=>{
    return {
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    }
}