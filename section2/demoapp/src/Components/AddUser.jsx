import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import '../stylesheets/styles.css'
import {storage} from '../firebase'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

const AddUser=()=>{
    const {adminId}=useParams()
    const [email,setEmail]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [password,setPassword]=useState("")
    const [dob,setDob]=useState()
    const [pic,setPic]=useState("")
    const [image,setImage]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    const history=useHistory()

    useEffect(()=>{
        const x=JSON.parse(localStorage.getItem("user"))
        if(!x || x.userId!==adminId){
            history.push('/unauthorized')
            return
        }
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(firstName===null || firstName.length===0 || password===null || password.length<4 || !dob){
            setShowAlert(true)
            return;
        }
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)===false)
        {
            setShowAlert(true)
            return
        }

        if(!image){
            const newUser={
                email,
                firstName,
                lastName,
                password,
                dob,
                pic
            }
            axios.post(`http://localhost:3001/auth/signup`,
            newUser,getHeader())
            .then((res)=>{
                if(res.status!==201){
                    setShowAlert(true)
                    return
                }
                if(adminId){
                    history.push(`/adminSettings/${adminId}`)
                }
                else{
                    localStorage.setItem("user",JSON.stringify(newUser))
                    history.push({
                        pathname:'/home',
                        state:{user:newUser}
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })
            return
        }

        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on("state_changed", console.log, console.error, () => {
        uploadTask
            .snapshot
            .ref
            .getDownloadURL()
            .then((url) => {
                console.log(url);
                const newUser={
                    email,
                    firstName,
                    lastName,
                    password,
                    dob,
                    pic:url
                }
                axios.post(`http://localhost:3001/auth/signup`,
                newUser,getHeader())
                .then((res)=>{
                    if(res.status!==201){
                        setShowAlert(true)
                        return
                    }
                    if(adminId){
                        history.push(`/adminSettings/${adminId}`)
                    }
                    else{
                        localStorage.setItem("user",JSON.stringify(newUser))
                        history.push({
                            pathname:'/home',
                            state:{user:newUser}
                        })
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
                return
            })
            .catch(err=>{
                console.log(err)
                setShowAlert(true)
            });
        });

    }

    const onReset=()=>{
        setEmail("")
        setFirstName("")
        setLastName("")
        setPassword("")
        setImage("")
        setDob(null)
        setShowAlert(false)
    }

    return (
        <section>
            <div className="card">
            <div className="card-header">Sign up new user</div>
            <div className="card-body">
            {
                showAlert?(
                <div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}>Invalid email/first name/password/DOB</span>
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
                <label htmlFor="email">Email</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="text" name="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="password">Password</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="dob">Date of Birth</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="date" name="dob" placeholder="Date in yyyy-mm-dd" value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="pic">Upload profile picture</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="file" name="pic"  onChange={(e)=>{setImage(e.target.files[0])}}/>
                </div>
                {
                    (email==="" || password==="" || firstName==="" || !dob)?
                    (""):
                    (<div className="button-div">
                        <input type="submit" className="login-button" value="Signup" />
                        <input type="button" className="reset-button" value="Reset" onClick={()=>{onReset()}}/>
                    </div>)
                }
            </form>
            </div>
            </div>
        </section>
    )
}

export default AddUser

