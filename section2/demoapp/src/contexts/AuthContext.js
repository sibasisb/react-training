import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser,setCurrentUser]=useState()

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
        })

        return unsubscribe
    },[])

    // function signup(email,password){
    //     return auth.createUserWithEmailAndPassword(email,password)
    // }

    function signin(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function signout(){
        return auth.signOut()
    }

    function deleteUser(){
        return auth.currentUser.delete()
    }

    function updateUser(password){
        return auth.currentUser.updatePassword(password)
    }

    const value={
        currentUser,
        signin,
        signout,
        deleteUser,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}