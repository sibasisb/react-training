import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "../App"

export default function PrivateRoute({ component: Component,roles, ...rest }) {
    const {state}=useContext(UserContext)

    function checkAuthorization(){
        const user=JSON.parse(localStorage.getItem("user"))
        if(roles.includes(user.role))
            return true
        return false
    }

    function checkAuthentication(){
        const token=localStorage.getItem("token")
        if(token)
            return true
        return false
    }

    return (
        <Route
        {...rest}
        render={props => {
            if(!checkAuthentication())
                return <Redirect to="/unauthorized" />
            if(checkAuthorization()) 
                return <Component {...props} />
            return <Redirect to="/unauthorized" />
        }}
        ></Route>
    )
}