import React from 'react'
import '../stylesheets/styles.css'

const LoginComponent=()=>{
    return (
        <div className="card">
            <h2>Please Log In Here</h2>
            <form className="myform">
                <div className="input-div">
                <label htmlFor="username">Username</label><br/>
                <input style={{width:"100%",marginTop:"1px"}} type="text" name="username" placeholder="Username"/>
                </div>
                <div className="input-div">
                <label htmlFor="password">Password</label><br/>
                <input style={{width:"100%",marginTop:"1px"}} type="password" name="password" placeholder="Password"/>
                </div>
                <div className="button-div">
                <button className="login-button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;