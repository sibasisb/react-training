import React from "react";
import '../stylesheets/styles.css'

const Header=()=>{
    return (
        <header>
            <div className="header-flex">
                <div className="user-info">
                    <div><span className="material-icons" style={{color: "white", fontSize: "3rem"}}>account_circle</span></div>
                    <div className="user-name"><span>Quickpunch</span></div>
                </div>
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