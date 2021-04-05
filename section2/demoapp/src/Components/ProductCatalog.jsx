import React, { memo } from 'react'
import {Link} from 'react-router-dom'
import '../stylesheets/styles.css'
import Pagination from './Pagination'

const ProductCatalog=({userId,alert,products,currentProducts,displayProducts,productsPerPage,paginate})=>{
    return (
        <div className="admin-table-view">
            <div className="admin-table-header">
                Product Catalog
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
                            {displayProducts(currentProducts)}
                        </ul>
                        <Pagination
                            productsPerPage={productsPerPage}
                            totalProducts={products.length}
                            paginate={paginate}
                        />
                    </div>
                )
                ):
                ""
            }
            {
                JSON.parse(localStorage.getItem("user")).role==="admin"?
                (
                    <div className="button-div">
                        <Link to={`/addProduct/${userId}`} className="add-user-link"><button>Add Product</button></Link>
                    </div>
                ):
                ""
            }
        </div>
    )
}

const MemoProductCatalog=memo(ProductCatalog)

export default MemoProductCatalog