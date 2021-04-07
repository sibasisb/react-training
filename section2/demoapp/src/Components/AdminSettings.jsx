import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import { getHeader } from '../helpers/AuthHeader'
import { useDispatch, useSelector } from 'react-redux'

const UsersListMemo=lazy(()=>import('./UsersList'))

const AdminSettings=()=>{
    // const [users,setUsers]=useState([])
    // const [alert,setAlert]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [usersPerPage,setUsersPerPage]=useState(1)
    const {userId}=useParams()
    const dispatch=useDispatch()

    useEffect(()=>{
        
        // axios.get('http://localhost:3001/auth/users')
        // .then(res=>{
        //     setAlert(true)
        //     let newUsers=res.data.users
        //     newUsers=newUsers.filter(u=>u.userId!==userId)
        //     setUsers(newUsers)
        // })
        // .catch(err=>console.log(err))
        dispatch({type:"FETCH_USERS_SAGA",userId})
    },[dispatch])

    function onDelete(user){
        // axios.delete(`http://localhost:3001/auth/${user.userId}`,getHeader())
        // .then(res=>{
        //     if(res.status!==200){
        //         return 
        //     }
        //     let newUsers=users.filter(u=>u.userId!==user.userId)
        //     setUsers(newUsers)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        dispatch({type:"DELETE_USER_SAGA",user,userId})

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

    //setting users
    const users=useSelector((state)=>state.usersList)
    const alert=users?true:false
    // setting the page indices
    const lastProductIndex=currentPage * usersPerPage
    const firstProductIndex=lastProductIndex - usersPerPage
    const currentUsers=users?.slice(firstProductIndex,lastProductIndex)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const moveLeft = ()=> setCurrentPage(currentPage>1?currentPage-1:currentPage) 
    const moveRight = ()=> setCurrentPage(currentPage<Math.ceil((users.length/currentUsers.length))?currentPage+1:currentPage)

    return (
        <section>
        <Suspense fallback={<h1>Loading...</h1>}>
            <UsersListMemo userId={userId} alert={alert} users={users} currentUsers={currentUsers}
            paginate={paginate}  displayRows={displayRows} usersPerPage={usersPerPage}
            moveLeft={moveLeft} moveRight={moveRight} />
        </Suspense>     
        </section>   
    )
}

export default AdminSettings