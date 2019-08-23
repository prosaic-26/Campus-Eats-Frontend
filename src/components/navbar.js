import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import './navbar.css'

class Navbar extends Component{
    state={
      user:{username:"no one",flag:"loggedout"}
    }
    componentWillMount(){
      this.setState({user:this.props.user});
    }
    render(){
      console.log(this.state.user.username);
      this.loggedIn= this.loggedIn.bind(this);
      this.loggedOut= this.loggedOut.bind(this);
      this.toggleFunc = this.toggleFunc.bind(this);
      var items=["campus eats","register"];
      if(this.state.user.flag=="student")
        items=["campus eats","logout","outlets","myorders","cart","history"];
      if(this.state.user.flag=="admin")
        items=["campus eats","logout","dash","addoutlet"];
        if(this.state.user.flag=="outlet")
          items=["campus eats","logout","orders","myoutlet","mymenu"];
      items = items.map(function(item, index){
          return(<Link to={{pathname:"/"+item,state: { user:this.state.user}}}><li className={"nav-element "+ item}>{item.toUpperCase()}</li></Link>);
      }.bind(this));
      items[0]=<Link to={{pathname:"/",state: { user:this.state.user}}}><li className={"nav-element campus"}>CAMPUS EATS</li></Link>;
      if(this.state.user.flag!=="loggedout")
      items[1]=<Link to={{pathname:"/",state: { user:{username:"no one",flag:"loggedout"}}}}><li className={"nav-element logout"} onClick={this.loggedOut}>LOGOUT</li></Link>

      if(this.state.user.flag=="loggedout")
        items.push(<div className="nav-form">
                   <form onSubmit={this.loggedIn}>
                        <input type="text" placeholder="Username" className="nav-field" ref="username"/>
                        <input type="password" placeholder="Password" className="nav-field" ref="password"/>
                        <input type="submit" className="nav-submit" />
                   </form>
                   </div>)
      var veritems=[];
      if(this.state.user.flag=="student")
      veritems=["history"];
      veritems = veritems.map(function(item, index){
          return(<Link to={{pathname:"/"+item,state: { user:this.state.user}}}><li className={"ver-element "+ item}>{item.toUpperCase()}</li></Link>);
      }.bind(this));
      return(
        <div className="nav-bar-div">
        <ul className="nav-bar"><li className="nav-element fir" onClick={this.toggleFunc}><i class="fa fa-bars" aria-hidden="true"></i></li>{items}</ul>
        <div className="ver-nav-div">{veritems}</div>
        </div>
      );
    }
   toggleFunc(){
     var verNav = document.querySelector(".ver-nav-div");
     verNav.classList.toggle("dis-block");
   }
   loggedIn(e){
     var user;
     var status=false;
     e.preventDefault();
     axios.post("/login",{username:this.refs.username.value,password:this.refs.password.value}).then(res => {
       user = res.data.user;
       console.log(user);
       console.log(res.data.status);

       if(res.data.status==true){
         status=true;
         alert("Login successful");
         this.setState({user:user});
       }
       if(res.data.status==false){
         alert("Login failed......Please try again");
       }
       //console.log(this.state.user);
     });
   }
   loggedOut(e){
     this.setState({user:{username:"no one",flag:"loggedout"}});
   }
}
export default Navbar;
