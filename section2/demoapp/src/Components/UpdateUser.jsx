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
    const {currentUser}=useAuth()
    const [image,setImage]=useState("")
    const [showAlert,setShowAlert]=useState(false)
    const {state,dispatch}=useContext(UserContext)
    const {updateUser,storage}=useAuth()
    const history=useHistory()

    useEffect(()=>{
        let x=state.find(user=>user.userId===userId)
        if(!currentUser ||!x || x.email!==currentUser.email){
            history.push('/unauthorized')
            return
        }
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
        if(!image){
            let x=state.find(user=>user.userId===userId)
            const newUser={
                ...x,
                firstName,
                lastName,
                password
            }
            updateUser(newUser.password)
            .then(()=>{
                dispatch({type:"USER_UPDATE",payload:{user:newUser}})
                //localStorage.setItem("user",JSON.stringify(newUser))
                history.push({
                    pathname:'/home',
                    state:{user:newUser}
                })
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
                //setFile(null);
                let x=state.find(user=>user.userId===userId)
                console.log(url);
                const newUser={
                    ...x,
                    firstName,
                    lastName,
                    password,
                    pic:url
                }
                updateUser(newUser.password)
                .then(()=>{
                    dispatch({type:"USER_UPDATE",payload:{user:newUser}})
                    //localStorage.setItem("user",JSON.stringify(newUser))
                    history.push({
                        pathname:'/home',
                        state:{user:newUser}
                    })
                })
            })
            .catch(err=>{
                console.log(err)
                console.log("could not update firebase storage");
                setShowAlert(true)
            });
        });
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