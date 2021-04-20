import React, { useContext, useState } from 'react'
import '../stylesheets/styles.css'
import axios from 'axios'
import store from '../store/store'

const LoginComponent=({history})=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    function handleSubmit(e){
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
        const signinQuery={
            query:`{
                signin(email:"${email}",password:"${password}"){
                    user {
                        userId
                        email
                        firstName
                        lastName
                        dob
                        role
                        pic
                        todos{
                            id
                            title
                            description
                        }
                    }
                    message
                    token
                    }
                }`
        }
        axios.post('http://localhost:3001/graphql',
        signinQuery)
        .then(res=>{
            if(!res.data.data.signin){
                setShowAlert(true)
                return
            }
            const newUser=res.data.data.signin.user
            if(!newUser){
                setShowAlert(true)
                return
            }     
            store.dispatch({type:"USER_LOGIN",payload:{user:newUser,token:res.data.data.signin.token}})
            console.log(store.getState());
            history.push({
                pathname:'/home',
                state:{user:newUser}
            })            
        })
        .catch(err=>{
            console.log(err)
            setShowAlert(true)
        })
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