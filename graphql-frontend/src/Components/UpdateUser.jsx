import React, { useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import '../stylesheets/styles.css'
import {storage} from '../firebase'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'
import store from '../store/store'

const UpdateUser=()=>{
    const {userId,adminId}=useParams()
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [dob,setDob]=useState()
    const [password,setPassword]=useState("")
    const [pic,setPic]=useState("")
    const [image,setImage]=useState("")
    const [user,setUser]=useState({})
    const [showAlert,setShowAlert]=useState(false)
    const history=useHistory()

    useEffect(()=>{
        const x=JSON.parse(localStorage.getItem("user"))
        if(!x || (x.userId!==userId && x.role!=="admin") || (adminId!=="null" && x.userId!==adminId)){
            history.push('/unauthorized')
            return
        }
        const fetchUserQuery={
            query:`{
                user(userId:"${userId}"){
                  user{
                        userId
                        firstName
                        lastName
                        email
                        dob
                        role
                        pic
                        todos {
                        id
                        }
                  }
                  message
                }
              }`
        }
        axios.post(`http://localhost:3001/graphql`,fetchUserQuery,getHeader())
        .then(res=>{
            console.log(res);
            if(res.status===200){
                setUser(res.data.data.user.user)
                setFirstName(res.data.data.user.user.firstName)
                setLastName(res.data.data.user.user.lastName)
                setPic(res.data.data.user.user.pic)
                setDob(res.data.data.user.user.dob)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    function handleSubmit(e){
        e.preventDefault()
        if(firstName===null || firstName.length===0 || password===null || password.length<4 || !dob){
            setShowAlert(true)
            return;
        }
        if(!image){
            const newUser={
                ...user,
                firstName,
                lastName,
                password,
                dob
            }
            let updateUserQuery={
                query:`mutation{
                    updateUser(userInfo:{userId:"${newUser.userId}",
                    firstName:"${newUser.firstName}",
                    lastName:"${newUser.lastName}",
                    password:"${newUser.password}",
                    dob:"${newUser.dob}"
                    pic:"${newUser.pic}"
                    }){
                      user{
                        userId
                        firstName
                        lastName
                        dob
                      }
                      message
                    }
                  }`
            }
            axios.post(`http://localhost:3001/graphql`,
            updateUserQuery,getHeader())
            .then((res)=>{
                if(res.data.data.user){
                    setShowAlert(true)
                    return
                }
                if(adminId!=="null"){
                    history.push(`/adminSettings/${adminId}`)
                }
                else{
                    localStorage.setItem("user",JSON.stringify({...newUser,password:undefined}))
                    store.dispatch({type:"USER_UPDATE",payload:{user:{...newUser,password:undefined}}})
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
                    ...user,
                    firstName,
                    lastName,
                    password,
                    dob,
                    pic:url
                }
                let updateUserQuery={
                    query:`mutation{
                        updateUser(userInfo:{userId:"${newUser.userId}",
                        firstName:"${newUser.firstName}",
                        lastName:"${newUser.lastName}",
                        password:"${newUser.password}",
                        dob:"${newUser.dob}",
                        pic: "${newUser.pic}"
                        }){
                          user{
                            userId
                            firstName
                            lastName
                            dob
                            pic
                          }
                          message
                        }
                      }`
                }
                axios.post(`http://localhost:3001/graphql`,
                updateUserQuery,getHeader())
                .then((res)=>{
                    if(res.data.data.user){
                        setShowAlert(true)
                        return
                    }
                    if(adminId!=="null"){
                        history.push(`/adminSettings/${adminId}`)
                    }
                    else{
                        localStorage.setItem("user",JSON.stringify({...newUser,password:undefined}))
                        store.dispatch({type:"USER_UPDATE",payload:{user:{...newUser,password:undefined}}})
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
        setFirstName("")
        setLastName("")
        setPic("")
        setPassword("")
        setDob(null)
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
                <label htmlFor="dob">Date of Birth</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="date" name="dob" placeholder="Date in yyyy-mm-dd" value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
                </div>
                <div className="input-div">
                <label htmlFor="pic">Upload profile picture</label><br/>
                <input style={{width:"100%",marginTop:"1px",lineHeight:"2"}} type="file" name="pic"  onChange={(e)=>{setImage(e.target.files[0])}}/>
                </div>
                {
                    (firstName==="" || password==="")?
                    (""):
                    (<div className="button-div">
                        <input type="submit" className="login-button" value="Save" />
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