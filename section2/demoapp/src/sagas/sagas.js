import {takeLatest} from 'redux-saga/effects'
import { handleDeleteProduct, handleFetchProducts } from './handlers/productHandler'
import { handleDeleteUser, handleFetchUsers } from './handlers/userHandler'

export function *watcherSaga(){
    yield takeLatest("FETCH_USERS_SAGA",handleFetchUsers)
    yield takeLatest("DELETE_USER_SAGA",handleDeleteUser)
    yield takeLatest("FETCH_PRODUCTS_SAGA",handleFetchProducts)
    yield takeLatest("DELETE_PRODUCT_SAGA",handleDeleteProduct)
}