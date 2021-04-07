import {put, call} from 'redux-saga/effects'
import { requestSignin } from "../requests/users";

export function* handleUserSignin(action){
    try{
        const response=yield call(requestSignin,action)
    }
    catch(error){
        console.log(error);
    }
}