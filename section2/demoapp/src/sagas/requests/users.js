import axios from 'axios'
import { getHeader } from '../../helpers/AuthHeader'

export const fetchUsers=()=>{
    return axios.get('http://localhost:3001/auth/users')
}

export const deleteUser=(action)=>{
    return axios.delete(`http://localhost:3001/auth/${action.user.userId}`,getHeader())
}