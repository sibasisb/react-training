import React, { useContext, useEffect, useState } from "react";
import '../stylesheets/styles.css'
import { Link, useHistory } from 'react-router-dom';
import store from "../store/store";
import Sidebar from "./Sidebar";

const Header=()=>{
    const [user,setUser]=useState(null)
    const [isMenuOpen,setIsMenuOpen]=useState(false)
    const history=useHistory()
    
    useEffect(()=>{
        const newUser=JSON.parse(localStorage.getItem("user"))
        setUser(newUser?newUser:null)
    },[])

    store.subscribe(()=>{
        const newUser=store.getState().user?store.getState().user:null
        setUser(newUser)
    })

    function handleLogout(){
        store.dispatch({type:"USER_LOGOUT",payload:{}})
        history.push('/')
    }
    return (
        <header>
            <Sidebar isMenuOpen={isMenuOpen} user={user} handleLogout={handleLogout} setIsMenuOpen={setIsMenuOpen}/>
            <div className="header-flex">
                {
                user?(
                <div className="user-info">
                    <div className="burger-icon-div">
                    <span id="menu" className="material-icons burger-icon" onClick={()=>{setIsMenuOpen(true)}}>
                        menu
                    </span>
                    </div>
                    <div>
                        {
                            user.pic?
                            (<img style={{width:"50px",height:"50px",borderRadius:"24px"}}
                            src={user?user.pic:'Loading..'} alt="Profile"
                            />):
                            (<span className="material-icons" style={{color: "white", fontSize: "3rem"}}>account_circle</span>)
                        }
                    </div>
                    <div className="user-name"><span>{user?.firstName?.charAt(0)?.toUpperCase() + user?.firstName?.slice(1)}</span></div>
                    {/* <div className="user-name"><Link to={"/userSetting/"+user.userId}><span>Settings</span></Link></div> */}
                </div>):
                (<div className="user-info">
                </div>)
                }

                <div className="logo">
                    <Link to={user?{pathname:'/home',state:{user:user}}:"/"}>
                        <img src="https://th.bing.com/th/id/OIP.tbBQtTHmFj9B-1836hLRHAHaHa?pid=ImgDet&rs=1" alt="Brand logo" width="36" height="36"/>
                        <span style={{paddingLeft:"10px"}}>Vindigo</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;