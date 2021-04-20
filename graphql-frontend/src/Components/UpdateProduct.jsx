import React, { useContext, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

const UpdateProduct=(props)=>{
    const product=props.location.state.product
    const [item,setItem]=useState({})
    const [showAlert,setShowAlert]=useState(false)
    const userId=props.location.state.userId
    const history=useHistory()

    useEffect(()=>{
        setItem(product)
        const x=JSON.parse(localStorage.getItem("user"))
        if(x.userId!==userId){
            history.push('/unauthorized')
            return
        }
    },[])

    const handleChangeProduct=(e)=>{
        const key=e.target.name
        const val=(key==="imageUrl")?e.target.files[0]:e.target.value
        const newProduct={...item}
        newProduct[key]=val
        setItem(newProduct)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append("image",item.imageUrl)
        axios.post(`http://localhost:3001/post-image`,
        formData,
        getHeader())
        .then(response=>{
            if(response.status===201){
                let url=response.data.filePath
                let editProductQuery={
                    query:`mutation{
                        editProduct(productInput:{
                            productId:"${item.id}",
                            title:"${item.title}",
                            price:"${item.price}",
                            description:"${item.description}",
                            expiryDate:"${item.expiryDate}",
                            imageUrl:"${url}"
                        }){
                            product{
                                id
                                title
                                price
                                description
                                expiryDate
                                imageUrl
                            }
                            message
                        }
                    }`
                }
                axios.post(`http://localhost:3001/graphql`,
                editProductQuery,
                getHeader())
                .then(res=>{
                    if(res.data.data.editProduct){
                        history.push(`/userSetting/${userId}`)
                        return
                    }
                    setShowAlert(true)
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err));

    }

    const onReset=()=>{
        const newItem={ ...item}
        newItem["title"]=product.title
        newItem["description"]=product.description
        newItem["price"]=product.price
        newItem["expiryDate"]=product.expiryDate
        setShowAlert(false)
        setItem(newItem)
    }

    return (
        <section>
        <div className="card">
            <div className="card-header">Edit Product here</div>
            <div className="card-body">
            {
                showAlert?(
                <div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}>Invalid inputs</span>
                    </div>
                </div>):
                ""
            }
            <form className="myform" onSubmit={handleSubmit}>
                <div className="input-div">
                <label htmlFor="title">Title</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="title" placeholder="Title" value={item.title} onChange={(e)=>{handleChangeProduct(e)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="description">Description</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="description" placeholder="Description" value={item.description} onChange={handleChangeProduct}/>
                </div>
                <div className="input-div">
                <label htmlFor="price">Price</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="number" name="price" placeholder="Price" value={item.price} onChange={handleChangeProduct}/>
                </div>
                <div className="input-div">
                <label htmlFor="imageUrl">Picture of product</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="file" name="imageUrl" onChange={handleChangeProduct}/>
                </div>
                <div className="input-div">
                <label htmlFor="expiryDate">Expiry Date</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="date" name="expiryDate" onChange={handleChangeProduct} value={item.expiryDate} />
                </div>
                {
                    (item.title==="" || item.description==="" || !item.imageUrl || !item.expiryDate)?
                    (""):
                    (<div className="button-div">
                        <input type="submit" className="login-button" value="Save" />
                        <input type="button" className="reset-button" value="Reset" onClick={()=>{onReset()}}/>
                    </div>)
                }
            </form>
            </div>
        </div>
        </section>
    )
}

export default UpdateProduct