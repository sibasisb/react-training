import React, { useState } from 'react'
import '../stylesheets/styles.css'

const LoginComponent=({onLogin})=>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [showAlert,setShowAlert]=useState(false)

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(username===null || username.length===0 || password===null || password.length===0){
            setShowAlert(true)
            return;
        }
        const newUser={
            username,
            password
        }
        onLogin(newUser)
    }

    return (
        <section>
        <div className="card">
            <div className="card-header">Please Log In Here</div>
            <div className="card-body">
            {
                showAlert?(
                <div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}>Please enter all the fields</span>
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
                <label htmlFor="password">Password</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="button-div">
                <input type="submit" className="login-button" value="Login" />
                </div>
            </form>
            </div>
        </div>
        </section>
    )
}

export default LoginComponent;