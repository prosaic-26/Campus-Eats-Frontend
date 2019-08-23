import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import './home.css';

class Home extends Component{
    state={
      user:{username:"no one",flag:"loggedout"}
    }
    componentWillMount(){
      this.setState(this.props.location.state);
    }
    render(){
      return(
        <div className="cover">
        <Navbar user={this.state.user}/>
        <div className="home-div">
        <img src="./home.jpg" className="home-img"></img>
        <div className="home-inn">
        <div className="home-title"><h1 className="title">Campus Eats</h1></div>
        <div className="home-des"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        </div>
        </div>
        </div>
      );
    }

}
export default Home
