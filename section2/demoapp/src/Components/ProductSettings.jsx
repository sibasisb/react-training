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
                newProducts.push({
                    id:"1",
                    title:"Shimla Apple",
                    description:"Juicy and sweet mouth-watering apples",
                    price:450,
                    imageUrl:"https://images.unsplash.com/photo-1589217157232-464b505b197f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                })
                newProducts.push({
                    id:"2",
                    title:"Nagpur Oranges",
                    description:"Juicy and sweet mouth-watering oranges",
                    price:450,
                    imageUrl:"https://images.unsplash.com/photo-1589217157232-464b505b197f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                })
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

    const deleteProduct=(product)=>{
        let newProducts=products.filter(prod=>prod.id!==product.id)
        setProducts(newProducts)
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
                    <img src={product.imageUrl} alt="Prod image" width={"200 vw"} height={"200 vh"}/>
                    <div className="product-description">
                        <ul>
                            <li>Product {product.id}</li>
                            <li>
                                {product.title}
                            </li>
                            <li>
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