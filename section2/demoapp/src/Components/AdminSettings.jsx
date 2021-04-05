import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'

const UsersListMemo=lazy(()=>import('./UsersList'))

const AdminSettings=()=>{
    const [users,setUsers]=useState([])
    const [alert,setAlert]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [usersPerPage,setUsersPerPage]=useState(1)
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
        .catch(err=>console.log(err))

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

    function displayRows(currentUsers){
        if(currentUsers){
            return currentUsers.map((user,index)=>{    
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

    // setting the page indices
    const lastProductIndex=currentPage * usersPerPage
    const firstProductIndex=lastProductIndex - usersPerPage
    const currentUsers=users.slice(firstProductIndex,lastProductIndex)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <section>
        <Suspense fallback={<h1>Loading...</h1>}>
            <UsersListMemo userId={userId} alert={alert} users={users} currentUsers={currentUsers}
            paginate={paginate}  displayRows={displayRows} usersPerPage={usersPerPage} />
        </Suspense>     
        </section>   
    )
}

export default AdminSettings