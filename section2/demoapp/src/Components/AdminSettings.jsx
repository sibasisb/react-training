import React, { lazy, Suspense, useEffect, useState } from 'react'
import '../stylesheets/styles.css'
import {Link, useHistory, useParams} from 'react-router-dom'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'

const UsersListMemo=lazy(()=>import('./UsersList'))

//setModal on root app element
Modal.setAppElement('#root')

const AdminSettings=()=>{
    // const [users,setUsers]=useState([])
    // const [alert,setAlert]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [usersPerPage,setUsersPerPage]=useState(1)
    const [isModalOpen,setIsModalOpen]=useState(false)
    const {userId}=useParams()
    const history=useHistory()
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
        setIsModalOpen(false)
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
        setIsModalOpen(false)
    }

    function displayRows(currentUsers){
        if(currentUsers){
            return currentUsers.map((user,index)=>{    
                return (
                    <>
                    <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{new Date().getFullYear()-Number(user?.dob?.substring(0,4))}</td>
                        <td>
                        <Link to={`/updateUser/${user.userId}/${userId}`}><span className="material-icons" style={{color:"black", fontSize: "2rem"}}>mode_edit</span></Link>
                        </td>
                        <td>
                            <span onClick={()=>{onDelete(user)}} className="material-icons" style={{color:"black",fontSize: "2rem"}}>delete_forever</span>
                        </td>
                        <td>
                            <button className="logout-button" onClick={()=>{setIsModalOpen(true)}}>View</button>
                        </td>
                    </tr>
                    <Modal isOpen={isModalOpen} shouldCloseOnOverlayClick={true} onRequestClose={()=>setIsModalOpen(false)} 
                    className="user-modal-content" overlayClassName="modal-overlay" >
                        <div className="product-table-modal">
                        <div className="product-table-header">
                            User Information
                        </div>
                        <div className="product-list-item">
                            {
                                user.pic?
                                (
                                    <img className="user-modal-image" src={user.pic} alt="User profile picture"/>
                                ):
                                (
                                    <img className="user-modal-image" src={`https://th.bing.com/th/id/OIP.wKNft4u0YCq9Svzs7edYMQHaEq?pid=ImgDet&rs=1`} alt="User profile picture"/>
                                )
                            }
                            <div className="product-description">
                                <ul>
                                    <li>User Id: {user.userId}</li>
                                    <li>
                                        Name: {`${user.firstName} ${user.lastName}`}
                                    </li>
                                    <li>
                                        Age: {new Date().getFullYear()-Number(user?.dob?.substring(0,4))}
                                    </li>
                                    <li>
                                    {
                                        JSON.parse(localStorage.getItem("user")).role==="admin"?
                                        (
                                            <div className="button-div">
                                                <button onClick={()=>{
                                                    history.push(`/updateUser/${user.userId}/${userId}`)      
                                                }} className="update-button">Update  <span className="material-icons">mode_edit</span></button>
                                                <button onClick={()=>{onDelete(user)}} className="delete-button">Delete  <span className="material-icons">delete_forever</span></button>
                                            </div>
                                        ):
                                        ""    
                                    }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <button style={{marginLeft:"10%",marginTop:"5%"}} className="close-button" onClick={()=>setIsModalOpen(false)}>Close</button>
                        </div>
                        </div>
                    </Modal>
                    </>
                )
            })
        }
    }

    //setting users
    const users=useSelector((state)=>state.usersList)
    const alert=Array.isArray(users)?true:false
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