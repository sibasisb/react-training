import React, { useContext, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

const AdminSettings=()=>{
    const [users,setUsers]=useState([])
    const [alert,setAlert]=useState(false)
    const {userId}=useParams()
    const history=useHistory()

    useEffect(()=>{
        axios.get('http://localhost:3001/auth/users')
        .then(res=>{
            setAlert(true)
            let newUsers=res.data.users
            newUsers=newUsers.filter(u=>u.userId!==userId)
            setUsers(newUsers)
        })
    },[])

    function onDelete(user){
        axios.delete(`http://localhost:3001/auth/${user.userId}`,getHeader())
        .then(res=>{
            if(res.status!==200){
                return 
            }
            let newUsers=users.filter(u=>u.userId!==user.userId)
            setUsers(newUsers)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function displayRows(){
        if(users){
            return users.map((user,index)=>{    
                return (
                    <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>
                        <Link to={`/updateUser/${user.userId}/${userId}`}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>mode_edit</span></Link>
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