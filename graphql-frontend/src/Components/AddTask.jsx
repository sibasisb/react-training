import axios from 'axios'
import React,{ useState } from 'react'
import { getHeader } from '../helpers/AuthHeader'

const AddTask=({userId,handleModalStateChange})=>{
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    const onReset=()=>{
        setTitle("")
        setDescription("")
        setShowAlert(false)
    }

    const handleAddTask=(e)=>{
        e.preventDefault()
        const newTodo={
            title,
            description
        }
        const createTaskQuery={
            query:`mutation{
                createTask(taskInput:{
                    title:"${newTodo.title}",
                    description:"${newTodo.description}"
                }){
                    statusCode
                    message
                }
            }`
        }
        axios.post(`http://localhost:3001/graphql`,createTaskQuery,getHeader())
        .then(res=>{
            if(res.data.data.createTask.statusCode==="201"){
                onReset()
                setShowAlert(false)
                handleModalStateChange()
            }
        })  
        .catch(err=>{
            console.log(err);
            setShowAlert(true)
        })
    }

    return (
        <div className="product-table-modal">
            <div className="product-table-header">
                Add your task
            </div>
            {
                showAlert?(
                <div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}>Invalid title/description</span>
                    </div>
                </div>):
                ""
            }
            <form className="task-form" onSubmit={handleAddTask}>
                <div className="input-div">
                <label htmlFor="title">Title</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="title" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="description">Description</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="description" placeholder="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                </div>
                {
                    (!title || !description)?
                    (""):
                    (<div className="button-div">
                        <input type="submit" className="add-task-button" value="Add" />
                        <input type="button" className="reset-task-button" value="Reset" onClick={()=>{onReset()}}/>
                    </div>)
                }
            </form>
        </div>
    )
}

export default AddTask 