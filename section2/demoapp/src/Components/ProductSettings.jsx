import React, { useContext, useEffect, useState, lazy, Suspense } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

//lazily load ProductCatalog component
const MemoProductCatalog=lazy(()=>import('./ProductCatalog'))

/**
 * Component to add, edit and delete products 
 * @returns a component to provide adjustment of products to admin
 */
const ProductSettings=()=>{
    const [products,setProducts]=useState([])
    const [alert,setAlert]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage,setProductsPerPage]=useState(1)
    const {userId}=useParams()
    const history=useHistory()

    useEffect(()=>{
        const x=JSON.parse(localStorage.getItem("user"))
        if(x.userId !== userId){
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
    const displayProducts=(currentProducts)=>{
        return currentProducts.map((product,index)=>{
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
                            {
                                JSON.parse(localStorage.getItem("user")).role==="admin"?
                                (
                                    <div className="button-div">
                                        <button onClick={()=>{updateProduct(product)}} className="update-button">Update  <span className="material-icons">mode_edit</span></button>
                                        <button onClick={()=>{deleteProduct(product)}} className="delete-button">Delete  <span className="material-icons">delete_forever</span></button>
                                    </div>
                                ):
                                ""    
                            }
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            )
        })
    }

    // setting the page indices
    const lastProductIndex=currentPage * productsPerPage
    const firstProductIndex=lastProductIndex - productsPerPage
    const currentProducts=products.slice(firstProductIndex,lastProductIndex)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const moveLeft = ()=> setCurrentPage(currentPage>1?currentPage-1:currentPage) 
    const moveRight = ()=> setCurrentPage(currentPage<Math.ceil((products.length/currentProducts.length))?currentPage+1:currentPage)

    return (
        <section>
        <Suspense fallback={<h1>Loading...</h1>}>
            <MemoProductCatalog userId={userId} alert={alert} products={products} currentProducts={currentProducts} 
            displayProducts={displayProducts} productsPerPage={productsPerPage} paginate={paginate} moveLeft={moveLeft}
            moveRight={moveRight}/>     
        </Suspense>
        </section>
    )
}

export default ProductSettings