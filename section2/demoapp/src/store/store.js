import { createStore } from 'redux'
import {initialState, userReducer} from '../reducers/userReducer'

const store=createStore(userReducer,initialState)

export default store;


