import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
class Login extends Component{
    state={
      user:{username:"no one",flag:"loggedout"}
    }
    componentWillMount(){
      this.setState(this.props.location.state)
    }
    render(){
      console.log(this.state.user.flag);
      return(
        <div className="cover">
        <Navbar user={this.state.user}/>
        <h1>Login page</h1>
        <h1>{this.state.user.username}</h1>
        </div>
      );
    }
  //Custom functions

}
export default Login
