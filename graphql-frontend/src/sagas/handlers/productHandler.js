import { call, put } from "redux-saga/effects";
import { deleteProduct, fetchAllProducts } from "../requests/products";


export function* handleFetchProducts(action){
    try{
        const response=yield call(fetchAllProducts)
        if(response.data.data.products){
            yield put({type:"FETCH_PRODUCTS",payload:{productsList:response.data.data.products}})
        }

    }
    catch(error){
        console.log(error);
    }
}

export function* handleDeleteProduct(action){
    try{
        let response=yield call(deleteProduct,action)
        if(response.data.data.deleteProduct.statusCode==="200"){
            response=yield call(fetchAllProducts)
            if(response.data.data.products){
                yield put({type:"FETCH_PRODUCTS",payload:{productsList:response.data.data.products}})
            }
        }        
    }
    catch(error){
        console.log(error);
    }
}