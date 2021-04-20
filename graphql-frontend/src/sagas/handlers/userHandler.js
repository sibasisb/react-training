import {put, call} from 'redux-saga/effects'
import { deleteUser, fetchUsers, fetchUserTodos } from "../requests/users";

export function* handleFetchUsers(action){
    try{
        const response=yield call(fetchUsers)
        if(response.status===200){
            let newUsers=response.data.data.users
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
                let newUsers=response.data.data.users
                newUsers=newUsers.filter(user=>user.userId!==action.userId)
                yield put({type:"FETCH_USERS",payload:{usersList:newUsers}})
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

export function* handleFetchCurrentUserTodos(action){
    try{
        let response=yield call(fetchUserTodos,action)
        if(response.data.data.user){
            let todos=response.data.data.user.user.todos
            yield put({type:"FETCH_USER_TODOS",payload:{currentUserTodos:todos}})
        }
    }
    catch(error){
        console.log(error);
    }
}

export function* handleUpdateCurrentUserTodos(action){
    try{
        yield put({type:"UPDATE_USER_TODOS",payload:action.payload})
    }
    catch(error){
        console.log(error);
    }
}