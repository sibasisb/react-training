import React from 'react'
import '../stylesheets/styles.css'
import Footer from './Footer'
import Header from './Header'
import Home from './Home';
import LoginComponent from './LoginComponent';

class LandingComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            user:{
                username:"",
                profilePic:"",
                isLoggedIn:false
            }
        }
        this.userLogin=this.userLogin.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
    }

    handleLogout(){
        this.setState({
            user:{
                username:"",
                profilePic:"",
                isLoggedIn:false
            }
        })
    }

    userLogin(newUser){
        this.setState({
            user:{...newUser,isLoggedIn:true}
        })
    }

    render(){
        return (
            <>
            <Header isLoggedIn={this.state.user.isLoggedIn} username={this.state.user.username} handleLogout={this.handleLogout}/>
            {
                !this.state.user.isLoggedIn && (
                    <LoginComponent onLogin={(newUser)=>{this.userLogin(newUser)}} />
                )
            }
            {
                this.state.user.isLoggedIn && (
                    <Home username={this.state.user.username}/>
                )
            }
            <Footer/>
            </>
        )
    }
}

export default LandingComponent;