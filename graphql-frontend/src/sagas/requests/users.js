import axios from 'axios'
import { getHeader } from '../../helpers/AuthHeader'

export const fetchUsers=()=>{
    const fetchQuery={
        query:`query{
            users {
                userId
                email
                firstName
                lastName
                dob
                role
                pic
            }
        }`
    }
    return axios.post('http://localhost:3001/graphql',fetchQuery,getHeader())
}

export const deleteUser=(action)=>{
    const deleteQuery={
        query:`mutation{
            deleteUser(userId:"${action.user.userId}"){
              message
            }
          }`
    }
    return axios.post(`http://localhost:3001/graphql`,deleteQuery,getHeader())
}

export const fetchUserTodos=(action)=>{
    const fetchUserQuery={
        query:`query{
            user(userId: "${action.payload.userId}"){
                user{
                    userId
                    email
                    firstName
                    lastName
                    dob
                    role
                    pic
                    todos{
                        id
                        title
                        description
                        unchecked
                    }
                }
                message
            }
        }`
    }
    return axios.post(`http://localhost:3001/graphql`,fetchUserQuery,getHeader())
}