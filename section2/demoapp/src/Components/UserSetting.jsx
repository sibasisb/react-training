import React, { useContext, useEffect } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import { UserContext } from '../App'
import { useAuth } from '../contexts/AuthContext'

const UserSetting=()=>{
    const {userId}=useParams()
    const {state,dispatch}=useContext(UserContext)
    const {deleteUser,currentUser}=useAuth()
    const history=useHistory()

    useEffect(()=>{
        let x=state.find(user=>user.userId===userId)
        if(!currentUser ||!x || x.email!==currentUser.email){
            history.push('/unauthorized')
            return
        }
    },[userId])

    async function onDelete(){
        try{
            await deleteUser();
            const newUser=state.find(user=>user.userId===userId)
            dispatch({type:"USER_DELETE",payload:{user:newUser}})
            history.push('/')
        }
        catch{
            console.log("could not delete user");
        }
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
                            <Link to={"/updateUser/" + userId}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>mode_edit</span></Link>
                        </div>
                    </li>
                    <li>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <span>Delete</span>
                            <span onClick={()=>{onDelete()}} className="material-icons" style={{color:"black",fontSize: "2rem"}}>delete_forever</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default UserSetting