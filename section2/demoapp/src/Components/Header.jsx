import React, { useContext, useEffect, useState } from "react";
import '../stylesheets/styles.css'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from "../App";

const Header=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [user,setUser]=useState(null)
    const history=useHistory()
    useEffect(()=>{
        const newUser=state.find(user=>user.isLoggedIn===true)
        setUser(newUser)
        
    },[state])

    const handleLogout=()=>{
        const newUser={
            ...user,
            isLoggedIn:false
        }
        dispatch({type:"USER_UPDATE",payload:{user:newUser}})
        history.push('/')
    }
    return (
        <header>
            <div className="header-flex">
                {
                user?.isLoggedIn?(
                <div className="user-info">
                    <div><span className="material-icons" style={{color: "white", fontSize: "3rem"}}>account_circle</span></div>
                    <div className="user-name"><span>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span></div>
                    <div className="user-name"><Link to={"/userSetting/"+user.userId}><span>Settings</span></Link></div>
                    <div className="user-name"><button className="logout-button" onClick={()=>{handleLogout()}}>Logout</button></div>
                </div>):
                (<div className="user-info">
                </div>)
                }

                <div className="logo">
                    <a href="#">
                        <img src="https://th.bing.com/th/id/OIP.tbBQtTHmFj9B-1836hLRHAHaHa?pid=ImgDet&rs=1" alt="Brand logo" width="36" height="36"/>
                        <span style={{paddingLeft:"10px"}}>Vindigo</span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header;