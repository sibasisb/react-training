import React, { useContext, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

/**
 * Component to add, edit and delete products 
 * @returns a component to provide adjustment of products to admin
 */
const ProductSettings=()=>{
    const [products,setProducts]=useState([])
    const [alert,setAlert]=useState(false)
    const {userId}=useParams()
    const history=useHistory()

    useEffect(()=>{
        const x=JSON.parse(localStorage.getItem("user"))
        if(x.userId!==userId){
            history.push('/unauthorized')
            return
        }
        axios.get('http://localhost:3001/products/getAllProducts',getHeader())
        .then(res=>{
            setAlert(true)
            if(res.status===200){
                let newProducts=res.data.products
                setProducts(newProducts)
            }
        })
        .catch(err=>console.log(err))

    },[])

    const updateProduct=(product)=>{
        history.push({
            pathname:'/updateProduct',
            state:{product:product, userId:userId}
        })
    }   

    /**
     * Function invoking endpoint to delete a product
     * @param product 
     */
    const deleteProduct=(product)=>{

        axios.delete(`http://localhost:3001/products/deleteProduct/${product.id}`,getHeader())
        .then(res=>{
            if(res.status===200){
                let newProducts=products.filter(prod=>prod.id!==product.id)
                setProducts(newProducts)
            }
        })
        .catch(err=>console.log(err))

    }

    /**
     * Function which maps each product into a wrapper JSX
     * @returns JSX element
     */
    const displayProducts=()=>{
        return products.map((product,index)=>{
            return (
            <li key={index}>
                <div className="product-list-item">
                    <img src={`http://localhost:3001/${product.imageUrl}`} alt="Prod image" width={"200 vw"} height={"200 vh"}/>
                    <div className="product-description">
                        <ul>
                            <li>Product {product.id}</li>
                            <li>
                                {product.title}
                            </li>
                            <li className="product-description-field">
                                {product.description}
                            </li>
                            <li>
                                Price: &#x20B9; {product.price}
                            </li>
                            <li>
                            <div className="button-div">
                                <button onClick={()=>{updateProduct(product)}} className="update-button">Update  <span className="material-icons">mode_edit</span></button>
                                <button onClick={()=>{deleteProduct(product)}} className="delete-button">Delete  <span className="material-icons">delete_forever</span></button>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            )
        })
    }

    return (
        <section>
        <div className="admin-table-view">
            <div className="admin-table-header">
                Manage Products
            </div>
            {
                alert?
                (products.length===0?
                (<div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}><h3>No products to show</h3></span>
                    </div>
                </div>):
                (
                    <div className="gallery">
                        <ul>
                            {displayProducts()}
                        </ul>
                    </div>
                )
                ):
                ""
            }
            <div className="button-div">
                <Link to={`/addProduct/${userId}`} className="add-user-link"><button>Add Product</button></Link>
            </div>
        </div>     
        </section>
    )
}

export default ProductSettings