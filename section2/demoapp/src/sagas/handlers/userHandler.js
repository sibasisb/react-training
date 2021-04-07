import {put, call} from 'redux-saga/effects'
import { deleteUser, fetchUsers } from "../requests/users";

export function* handleFetchUsers(action){
    try{
        const response=yield call(fetchUsers)
        if(response.status===200){
            let newUsers=response.data.users
            newUsers=newUsers.filter(user=>user.userId!==action.userId)
            console.log(action);
            yield put({type:"FETCH_USERS",payload:{usersList:newUsers}})
        }

    }
    catch(error){
        console.log(error);
    }
}

export function* handleDeleteUser(action){
    try{
        let response=yield call(deleteUser,action)
        if(response.status===200){
            response=yield call(fetchUsers)
            if(response.status===200){
                let newUsers=response.data.users
                newUsers=newUsers.filter(user=>user.userId!==action.userId)
                yield put({type:"FETCH_USERS",payload:{usersList:newUsers}})
            }
        }
    }
    catch(error){
        console.log(error);
    }
}