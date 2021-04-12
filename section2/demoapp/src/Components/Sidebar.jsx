import React,{useState} from 'react'
import { createPortal } from 'react-dom/cjs/react-dom.development'
import { Link } from 'react-router-dom'

const SidebarContent=({user,handleLogout,setIsMenuOpen})=>{
    return (
        <div className="sidebar-container">
        <div className="sidebar-overlay">
            <div className="sidebar-content">
                <div className="menu-info">
                    <div className="close-icon-div">
                        <div>
                            <button className="close-icon" onClick={()=>{setIsMenuOpen(false)}}> Close </button>
                        </div>
                    </div>
                    <div>
                        {
                            user?.pic?
                            (<img style={{width:"80%",height:"80%", margin:"4% 2% 0% 8%"}}
                            src={user?user.pic:'Loading..'} alt="Profile"
                            />):
                            (<span className="material-icons" style={{color: "white", fontSize: "3rem"}}>account_circle</span>)
                        }
                    </div>
                    <div className="menu-user-name">
                        <Link onClick={()=>{setIsMenuOpen(false)}} to={"/updateUser/" + user?.userId + "/null"}>
                            <span>{user?.firstName?.charAt(0)?.toUpperCase() + user?.firstName?.slice(1)}</span>
                        </Link>
                    </div>
                    {
                        user.role==="admin"?
                        (<>
                        <div className="menu-user-name">
                        <Link onClick={()=>{setIsMenuOpen(false)}} to={`/addUser/${user.userId}`}>
                            <span>Add User</span>
                        </Link>
                        </div>
                        <div className="menu-user-name">
                        <Link onClick={()=>{setIsMenuOpen(false)}} to={`/addProduct/${user.userId}`}>
                            <span>Add Product</span>
                        </Link>
                        </div>
                        </>):
                        ""
                    }
                    <div className="menu-user-name"><Link onClick={()=>{setIsMenuOpen(false)}} to={"/userSetting/"+user?.userId}><span>Settings</span></Link></div>
                    <div className="menu-user-name"><button className="logout-button" onClick={()=>{
                        setIsMenuOpen(false);
                        handleLogout();
                    }}>Logout</button></div>
                </div>
            </div>
        </div>
        </div>
    )
}

const Sidebar=({isMenuOpen,user,handleLogout,setIsMenuOpen})=>{
    return(
        <>
        {
            isMenuOpen?
            createPortal(<SidebarContent user={user} handleLogout={handleLogout} setIsMenuOpen={setIsMenuOpen}></SidebarContent>,document.body,):
            (<></>)
        }
        </>
    )
}

export default Sidebar