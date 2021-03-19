import React, { useContext } from 'react'
import { UserContext } from '../App'
import '../stylesheets/styles.css'
import {Link} from 'react-router-dom'

const AdminSettings=()=>{
    const {state}=useContext(UserContext)

    const onDelete=()=>{

    }

    function displayRows(){
        if(state){
            return state.map((user,index)=>{
                return (
                    <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>
                        <Link to={"/updateUser/" + user.userId}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>mode_edit</span></Link>
                        </td>
                        <td>
                            <span onClick={()=>{onDelete()}} className="material-icons" style={{color:"black",fontSize: "2rem"}}>delete_forever</span>
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
        </div>     
        </section>   
    )
}

export default AdminSettings