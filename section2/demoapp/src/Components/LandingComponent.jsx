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
            isLoggedIn:false,
            user:{
                username:"",
                password:""
            }
        }
        this.userLogin=this.userLogin.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
    }

    handleLogout(){
        this.setState({
            isLoggedIn:false,
            user:{
                username:"",
                password:""
            }
        })
    }

    userLogin(newUser){
        this.setState({
            isLoggedIn:true,
            user:newUser
        })
    }

    render(){
        return (
            <>
            <Header isLoggedIn={this.state.isLoggedIn} username={this.state.user.username} handleLogout={this.handleLogout}/>
            {
                !this.state.isLoggedIn && (
                    <LoginComponent onLogin={(newUser)=>{this.userLogin(newUser)}} />
                )
            }
            {
                this.state.isLoggedIn && (
                    <Home username={this.state.user.username}/>
                )
            }
            <Footer/>
            </>
        )
    }
}

export default LandingComponent;