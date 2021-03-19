import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth,storage } from '../firebase'

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

    // async function addImageUrl(image){
    //     const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    //     uploadTask.on("state_changed", console.log, console.error, () => {
    //     uploadTask
    //         .snapshot
    //         .ref
    //         .getDownloadURL()
    //         .then((url) => {
    //         //setFile(null);
    //             console.log(url);
    //             return url
    //         })
    //         .catch(err=>console.log(err));
    //     });
    // }

    const value={
        currentUser,
        signin,
        signout,
        deleteUser,
        updateUser,
        storage
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}