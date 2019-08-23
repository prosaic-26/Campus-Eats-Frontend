import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import './register.css';

class Register extends Component{
    state={
      user:{username:"no one",flag:"loggedout"}
    }
    componentWillMount(){
      this.setState(this.props.location.state);
    }
    render(){
      this.onRegister = this.onRegister.bind(this);
      return(
        <div className="cover">
        <Navbar user={this.state.user}/>
        <div id="register-main">
      <div id="register-box">
      <h1 id="box-title">Register Here</h1>
      <hr />
      <form id="form" onSubmit={this.onRegister}>
        <div id="div-name">
          <label for="name">Name: </label>
          <input type="input" className="register-input" name="name" placeholder="Enter Your Name" ref="name" required />
        </div>
        <div id="div-id">
          <label for="id">BITS ID: </label>
          <input type="input" className="register-input" name="id" placeholder="201XXXXXXXXXH" ref="bitsid" required />
        </div>
        <div id="div-email">
          <label for="name">E-Mail: </label>
          <input type="email" className="register-input" id="input-email" name="email" placeholder="f201xxxxx@hyderabad.bits-pilani.ac.in" ref="username" required />
        </div>
        <div id="div-number">
          <label for="number">Phone: </label>
          <input type="input" className="register-input" name="number" placeholder="9999999999" ref="mobno" required />
        </div>
        <div id="div-pass">
          <label for="pass">Password: </label>
          <input type="password" className="register-input" name="pass" placeholder="Enter Your Password" ref="password" required />
        </div>
        <div id="div-repass">
          <label for="repass">Re-enter Password: </label>
          <input type="password" className="register-input" name="repass" placeholder="Re-Enter Your Password" ref="repassword" required />
        </div>
        <div><button id="button-register">Register</button></div>
      </form>

    </div>
  </div>

        </div>
      );
    }
   onRegister(e){
     e.preventDefault();
     var p = this.refs.password.value;
     var rp = this.refs.repassword.value;
     var u = this.refs.username.value;
     var n = this.refs.name.value;
     var m = this.refs.mobno.value;
     var b = this.refs.bitsid.value;
     if(p!==rp){
       alert("Passwords are not same");
       return;
     }
     axios.post("/signup",{username:this.refs.username.value,
                                               password:this.refs.password.value,
                                               name:n,
                                               mobno:m,
                                               bitsid:b
                                                    }).then(res => {
       console.log(res.data.status);
       if(res.data.status==false){
         console.log(res.data.error);
         alert(res.data.error.message);
       }else{
         console.log(res.data.user);
         axios.post("/createcart",{user:res.data.user}).then(res=>{
           alert("registered successfully");
           console.log(res.data.cart);
     });
   }
 });
}
}
export default Register;
