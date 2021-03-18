import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../App'
import { useAuth } from '../contexts/AuthContext'
import '../stylesheets/styles.css'

const UpdateUser=()=>{
    const {userId}=useParams()
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [password,setPassword]=useState("")
    const [pic,setPic]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    const {state,dispatch}=useContext(UserContext)
    const {updateUser}=useAuth()
    const history=useHistory()

    useEffect(()=>{
        let x=state.find(user=>user.userId===userId)
        if(x){
            setFirstName(x.firstName)
            setLastName(x.lastName)
            setPic(x.pic)
        }
    },[])

    async function handleSubmit(e){
        e.preventDefault()
        if(firstName===null || firstName.length===0 || password===null || password.length<6){
            setShowAlert(true)
            return;
        }
        let x=state.find(user=>user.userId===userId)
        const newUser={
            ...x,
            firstName,
            lastName,
            password,
            pic
        }
        try{
            await updateUser(newUser.password)
            dispatch({type:"USER_UPDATE",payload:{user:newUser}})
            //localStorage.setItem("user",JSON.stringify(newUser))
            history.push({
                pathname:'/home',
                state:{user:newUser}
            })
        }
        catch{
            console.log("could not update user firebase");
            setShowAlert(true)
        }
    }

    const onReset=()=>{
        setFirstName("")
        setLastName("")
        setPic("")
        setPassword("")
        setShowAlert(false)
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
                        <span style={{color:"#0e141e"}}>Please give valid password and first name</span>
                    </div>
                </div>):
                ""
            }
            <form className="myform" onSubmit={handleSubmit}>
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
                    (firstName==="" || password==="")?
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