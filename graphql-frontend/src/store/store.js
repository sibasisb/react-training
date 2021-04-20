import { applyMiddleware, createStore } from 'redux'
import {initialState, userReducer} from '../reducers/userReducer'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from '../sagas/sagas'

const sagaMiddleware=createSagaMiddleware()
const middlewares=[sagaMiddleware]
const store=createStore(userReducer,initialState,applyMiddleware(...middlewares))

sagaMiddleware.run(watcherSaga)

export default store;


