import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../App'
import '../stylesheets/styles.css'

const UpdateUser=()=>{
    const {userId}=useParams()
    const [username,setUsername]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [password,setPassword]=useState("")
    const [pic,setPic]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()


    const handleSubmit=(e)=>{
        e.preventDefault()
        if(username===null || username.length===0 || password===null || password.length===0){
            setShowAlert(true)
            return;
        }
        const newUser={
            userId,
            username,
            firstName,
            lastName,
            password,
            pic,
            isLoggedIn:true
        }
        dispatch({type:"USER_UPDATE",payload:{user:newUser}})
        //localStorage.setItem("user",JSON.stringify(newUser))
        history.push({
            pathname:'/home',
            state:{user:newUser}
        })
    }

    const onReset=()=>{
        setUsername("")
        setPassword("")
    }

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Update your details
                </div>
                <div className="card-body">
            {
                showAlert?(
                <div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}>Please give a username and password</span>
                    </div>
                </div>):
                ""
            }
            <form className="myform" onSubmit={handleSubmit}>
                <div className="input-div">
                <label htmlFor="username">Username</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="username" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="firstName">First Name</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="lastName">Last Name</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="password">Password</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="pic">Profile picture link</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="pic" placeholder="Profile pic link" value={pic} onChange={(e)=>{setPic(e.target.value)}}/>
                </div>
                {
                    (username==="" || password==="")?
                    (""):
                    (<div className="button-div">
                        <input type="submit" className="login-button" value="Update" />
                        <input type="button" className="reset-button" value="Reset" onClick={()=>{onReset()}}/>
                    </div>)
                }
            </form>
            </div>
            </div>
        </section>
    )
}

export default UpdateUser