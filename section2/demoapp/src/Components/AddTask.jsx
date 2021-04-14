import React,{ useState } from 'react'

const AddTask=()=>{
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    
    const onReset=()=>{
        setTitle("")
        setDescription("")
    }

    return (
        <div className="product-table-modal">
            <div className="product-table-header">
                Add your task
            </div>
            <form className="task-form">
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