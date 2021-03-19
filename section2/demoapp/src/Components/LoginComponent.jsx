import React, { useContext, useState } from 'react'
import { UserContext } from '../App'
import { useAuth } from '../contexts/AuthContext'
import '../stylesheets/styles.css'

const LoginComponent=({history})=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    const {state,dispatch}=useContext(UserContext)
    const {signin}=useAuth()
    async function handleSubmit(e){
        e.preventDefault()
        if(email===null || email.length===0 || password===null || password.length===0){
            setShowAlert(true)
            return;
        }
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)===false)
        {
            setShowAlert(true)
            return
        }
        try{
            await signin(email,password)
            let x=state.find(user=>user.email===email)
            const newUser={
                ...x
            }
            dispatch({type:"USER_UPDATE",payload:{user:newUser}})
            //localStorage.setItem("user",JSON.stringify(newUser))
            history.push({
                pathname:'/home',
                state:{user:newUser}
            })
        }
        catch{
            setShowAlert(true)
            return
        }
    }

    const onReset=()=>{
        setEmail("")
        setPassword("")
        setShowAlert(false)
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
                        <span style={{color:"#0e141e"}}>Invalid email/password</span>
                    </div>
                </div>):
                ""
            }
            <form className="myform" onSubmit={handleSubmit}>
                <div className="input-div">
                <label htmlFor="email">Email</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="password">Password</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {
                    (email==="" || password==="")?
                    (""):
                    (<div className="button-div">
                        <input type="submit" className="login-button" value="Login" />
                        <input type="button" className="reset-button" value="Reset" onClick={()=>{onReset()}}/>
                    </div>)
                }
            </form>
            </div>
        </div>
        </section>
    )
}

export default LoginComponent;