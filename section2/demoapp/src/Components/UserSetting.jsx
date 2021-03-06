import React, { useContext, useEffect } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'
import store from '../store/store'

const UserSetting=()=>{
    const {userId}=useParams()
    const history=useHistory()

    useEffect(()=>{
        const x=JSON.parse(localStorage.getItem("user"))
        if(!x || x.userId!==userId){
            history.push('/unauthorized')
            return
        }
    },[userId])

    function onDelete(){
        
        axios.delete(`http://localhost:3001/auth/${userId}`,getHeader())
        .then(res=>{
            if(res.status!==200){
                return 
            }
            store.dispatch({type:"USER_LOGOUT",payload:{}})
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <section>
            <div className="card">
                <div className="card-header">
                    User Menu
                </div>
                <ul>
                    <li>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span>Update</span>
                            <Link to={"/updateUser/" + userId + "/null"}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>mode_edit</span></Link>
                        </div>
                    </li>
                    <li>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span>Delete</span>
                            <span onClick={()=>{onDelete()}} className="material-icons" style={{color:"black",fontSize: "2rem"}}>delete_forever</span>
                        </div>
                    </li>
                    {
                    (JSON.parse(localStorage.getItem("user"))?.role==="admin")?
                    (
                        <li>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span>Manage Users</span>
                            <Link to={"/adminSettings/"+userId}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>visibility</span></Link>
                        </div>
                        </li>
                    ):
                    ""
                    }
                    {
                    (JSON.parse(localStorage.getItem("user"))?.role==="admin")?
                    (
                        <li>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span>Manage Products</span>
                            <Link to={"/productSettings/"+userId}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>visibility</span></Link>
                        </div>
                        </li>
                    ):
                    ""
                    }
                </ul>
            </div>
        </section>
    )
}

export default UserSetting