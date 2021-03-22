import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'

const AdminSettings=()=>{
    const [users,setUsers]=useState([])
    const [alert,setAlert]=useState(false)
    const {userId}=useParams()
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()

    useEffect(()=>{
        let newUsers=state.filter(u=>u.userId!==userId)
        setAlert(true)
        setUsers(newUsers)
    },[state])

    function onDelete(user){
        console.log(user);
        let x=state.find(u=>u.userId===user.userId)
        console.log(x);
        dispatch({type:"USER_DELETE",payload:{user:x}})
        history.push(`/adminSettings/${userId}`)
    }

    function displayRows(){
        if(users){
            return users.map((user,index)=>{    
                return (
                    <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>
                        <Link to={"/adminUpdateUser/" + user.userId + "/" + userId}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>mode_edit</span></Link>
                        </td>
                        <td>
                            <span onClick={()=>{onDelete(user)}} className="material-icons" style={{color:"black",fontSize: "2rem"}}>delete_forever</span>
                        </td>
                    </tr>
                )
            })
        }
    }

    return (
        <section>
        <div className="admin-table-view">
            <div className="admin-table-header">
                Manage your Users
            </div>
            {
                alert?
                (users.length===0?
                (<div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}><h3>No users to show</h3></span>
                    </div>
                </div>):
                (
                    <div>
                    <table>
                        <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayRows()}
                        </tbody>
                    </table>
                    </div>
                )
                ):
                ""
            }
        </div>     
        </section>   
    )
}

export default AdminSettings