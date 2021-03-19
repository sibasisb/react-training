import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "../App"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component,roles, ...rest }) {
    const { currentUser } = useAuth()
    const {state}=useContext(UserContext)
    function checkAuthorization(){
        let x=state.find(user=>user.email===currentUser.email)
        console.log(roles);
        console.log(x.role);
        if(roles.includes(x.role))
            return true
        return false
    }

    return (
        <Route
        {...rest}
        render={props => {
            if(!currentUser)
                return <Redirect to="/unauthorized" />
            if(checkAuthorization()) 
                return <Component {...props} />
            return <Redirect to="/unauthorized" />
        }}
        ></Route>
    )
}