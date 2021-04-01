import React, { useContext, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

const AddProduct=()=>{
    const [item,setItem]=useState({})
    const [showAlert,setShowAlert]=useState(false)
    const {userId}=useParams()
    const history=useHistory()

    useEffect(()=>{
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
        console.log(item);
        const formData=new FormData()
        formData.append("title",item.title)
        formData.append("description",item.description)
        formData.append("price",item.price)
        formData.append("image",item.imageUrl)
        axios.post(`http://localhost:3001/products/addProduct`,
        formData,
        getHeader())
        .then(res=>{
            if(res.status===201){
                history.push(`/userSetting/${userId}`)
                return
            }
            setShowAlert(true)
        })
        .catch(err=>console.log(err))

    }

    const onReset=()=>{
        const newItem={ ...item}
        newItem["title"]=""
        newItem["description"]=""
        newItem["price"]=""
        setShowAlert(false)
        setItem(newItem)
    }

    return (
        <section>
        <div className="card">
            <div className="card-header">Add Product Details here</div>
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
                {
                    (item.title==="" || item.description==="" || !item.imageUrl)?
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

export default AddProduct