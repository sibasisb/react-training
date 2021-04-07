import axios from 'axios'

export const requestSignin=(action)=>{
    return axios.request(
        {
            method:'post',
            url:'http://localhost:3001/auth/signin',
            data:{
                email:action.email,
                password:action.password
            }
        }
    )
}