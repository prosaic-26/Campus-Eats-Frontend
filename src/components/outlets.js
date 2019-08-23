import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Scrollchor from 'react-scrollchor';
import OMenu from './omenu'
import Navbar from './navbar.js';
import "./outlets.css"
import "./load.css"

class Outlets extends Component{
  state={
    user:this.props.location.state.user,
    outlets:[{owner:{},menu:[]}],
    currOutlet:{owner:{username:"no one"},menu:[]},
    d:0,
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state);
    axios.post("/outlets",{}).then(res=>{
      this.setState({outlets:res.data.outlets,loadStatus:true});
      console.log(this.state.outlets);
    });
  }
  render(){
    console.log("Hii");
    this.securrOutlet = this.securrOutlet.bind(this);
    var outlets=this.state.outlets;
    var user=this.state.user;
    outlets=outlets.map(function(outlet,index){
      return(
        <div class="card">
        <div class="flip-card">
              <div class="flip-card-inner">
              <div class="flip-card-front">
              <img src={"/"+outlet.image} className="eo-image" alt="Avatar"  />
              </div>
              <div class="flip-card-back">
              <p className="eo-det-2">{outlet.description}</p>
              </div>
              </div>
              </div>
              <div class="o-container">
              <h4 className="eo-name">{outlet.name}</h4>
              <p className="eo-det">{outlet.location}</p>
              <p className="eo-det">{"Ph No:"+outlet.owner.mobno}</p>
              <div className="eo-but-div">
                <Scrollchor to="#o-menu-div" animate={{ offset: 0, duration: 300 }}><button id={"omb"+index} className="eo-button eo-b1" onClick={this.securrOutlet}>MENU</button></Scrollchor>
                <Link to={{pathname:"/oinfo",state: { user:this.state.user,outlet:outlet}}}><button className="eo-button eo-b2">INFO</button></Link>

              </div>
              </div>
        </div>
      )
    }.bind(this))
    if(this.state.loadStatus==false){
      return(
        <div className="cover">
          <Navbar user={this.state.user} />
        <div className="load-div">
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
        </div>
        </div>
      )
    }
    return(
      <div className="cover">
      <Navbar user={this.state.user} />
      <div className="ot-div">
      <h1 className="o-title">OUTLETS</h1>
      </div>
      <div className="outlets-div">
      <div className="outlets-main">
      <div className="outlets-inner">{outlets}</div>
      </div>
      </div>
      <section id="#aass">
      <div id="o-menu-div">
       <OMenu data={{user:this.state.user,d:this.state.d,outlets:this.state.outlets}} />
      </div>
      </section>
      </div>
    );
  }
  securrOutlet(e){
    var x = document.querySelector("#o-menu-div");
    x.style.display = "block";
    var d = e.target.id[3];
    console.log(d);
    var o = this.state.outlets[d];
    this.setState({d:d});
    console.log(this.state.currOutlet);
  }
}
export default Outlets;
