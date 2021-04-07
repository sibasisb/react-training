import { getHeader } from "../../helpers/AuthHeader";
import axios from 'axios'

export const fetchAllProducts=()=>{
    return axios.get('http://localhost:3001/products/getAllProducts',getHeader());
}

export const deleteProduct=(action)=>{
    return axios.delete(`http://localhost:3001/products/deleteProduct/${action.payload.product.id}`,getHeader())
}