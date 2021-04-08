import React, { memo } from 'react'
import {Link} from 'react-router-dom'
import '../stylesheets/styles.css'
import Pagination from './Pagination'

const UsersList=({userId,alert,users,displayRows,usersPerPage,paginate,currentUsers,moveLeft,moveRight})=>{
    return (
        <div className="admin-table-view">
            <div className="admin-table-header">
                Manage your Users
            </div>
            {
                alert?
                (users?.length===0?
                (<div className="alert-box">
                    <div className="alert-message">
                        <span style={{color:"#0e141e"}}><h3>No users to show</h3></span>
                    </div>
                </div>):
                (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User name</th>
                            <th>Age</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayRows(currentUsers)}
                        </tbody>
                    </table>
                    <Pagination
                        productsPerPage={usersPerPage}
                        totalProducts={users.length}
                        paginate={paginate}
                        moveLeft={moveLeft}
                        moveRight={moveRight}
                    />
                </>
                )
                ):
                ""
            }
            <div className="button-div">
                <Link to={`/addUser/${userId}`} className="add-user-link"><button>Add user</button></Link>
            </div>
        </div>
    )
}

const UsersListMemo=memo(UsersList)

export default UsersListMemo