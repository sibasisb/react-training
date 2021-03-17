import React from 'react'
import '../stylesheets/styles.css'
import {Link, useParams} from 'react-router-dom'

const UserSetting=()=>{
    const {userId}=useParams()
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
                            <Link to={""}><span className="material-icons" style={{color:"black",fontSize: "2rem"}}>delete_forever</span></Link>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default UserSetting