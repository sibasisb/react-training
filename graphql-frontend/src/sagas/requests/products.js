import { getHeader } from "../../helpers/AuthHeader";
import axios from 'axios'

export const fetchAllProducts=()=>{
    const fetchProductsQuery={
        query:`query{
            products{
                id
                title
                price
                description
                expiryDate
                imageUrl
            }
        }`
    }
    return axios.post('http://localhost:3001/graphql',fetchProductsQuery,getHeader());
}

export const deleteProduct=(action)=>{
    const deleteProductQuery={
        query:`mutation{
            deleteProduct(productId:"${action.payload.product.id}"){
                message
                statusCode
            }
        }`
    }
    return axios.post(`http://localhost:3001/graphql`,deleteProductQuery,getHeader())
}