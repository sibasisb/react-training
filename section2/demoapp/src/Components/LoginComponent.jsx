import React, { useState } from 'react'
import '../stylesheets/styles.css'

const LoginComponent=({onLogin})=>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        const newUser={
            username,
            password
        }
        onLogin(newUser)
    }

    return (
        <div className="card">
            <h2>Please Log In Here</h2>
            <form className="myform" onSubmit={handleSubmit}>
                <div className="input-div">
                <label htmlFor="username">Username</label><br/>
                <input style={{width:"100%",marginTop:"1px"}} type="text" name="username" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="password">Password</label><br/>
                <input style={{width:"100%",marginTop:"1px"}} type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="button-div">
                <input type="submit" className="login-button" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;