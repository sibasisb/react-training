import {takeLatest} from 'redux-saga/effects'
import { handleDeleteProduct, handleFetchProducts } from './handlers/productHandler'
import { handleDeleteUser, handleFetchUsers, handleFetchCurrentUserTodos, handleUpdateCurrentUserTodos } from './handlers/userHandler'

export function *watcherSaga(){
    yield takeLatest("FETCH_USERS_SAGA",handleFetchUsers)
    yield takeLatest("DELETE_USER_SAGA",handleDeleteUser)
    yield takeLatest("FETCH_PRODUCTS_SAGA",handleFetchProducts)
    yield takeLatest("DELETE_PRODUCT_SAGA",handleDeleteProduct)
    yield takeLatest("FETCH_USER_TODOS_SAGA",handleFetchCurrentUserTodos)
    yield takeLatest("UPDATE_USER_TODOS_SAGA",handleUpdateCurrentUserTodos)
}