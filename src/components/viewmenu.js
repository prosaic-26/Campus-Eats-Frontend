import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"

class ViewMenu extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false
  }
  /**/
  componentWillMount(){
    this.setState(this.props.location.state);
    axios.post("/myoutlet",{user:this.props.location.state.outlet.user}).then(res=>{
      this.setState({outlet:res.data.outlet,loadStatus:true});
      console.log("hi");
      console.log(this.state.outlet);
    });
    console.log(this.state.outlet);
  }
  render(){
    this.addToCart = this.addToCart.bind(this);
    var items=this.state.outlet.menu;
    items = items.map(function(item, index){
        return(
          <div className={item.category+" menuitem"}>
          <div className="menuitem-left">
              <div className="menuitem-name">Name:<b>{item.name}</b></div>
              <div className="menuitem-nov"><i className={item.nov+" fa fa-circle"} aria-hidden="true"></i></div>
              <div className="menuitem-category">{"Category:"+item.category}</div>
              <div className="item-price"><b>{item.price+"/-"}</b></div>
            </div>
            <div className="menuitem-right">
              <button className={"menuitem-button"} id={"item"+index} onClick={this.addToCart}>Add to Cart</button>
            </div>
          </div>
        );
    }.bind(this));
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
      <div className="mymenu-div">
      <h1 className="mymenu-title">{this.state.outlet.name+"-MENU"}</h1>
      <div className="menu-div">
          <h2 className="menu-title">MENU</h2>
          <div class="menu-inner">{items}</div>
      </div>
      </div>
      </div>
    )
  }
  addToCart(e){
    console.log(this.state.outlet.menu[e.target.id[4]]._id);
    var item = this.state.outlet.menu[e.target.id[4]];
    axios.post("/addtocart",{user:this.state.user,item:item}).then(res => {
      console.log(res.data.cart);
      if(res.data.status==false)
        alert(res.data.message);
    })
  }
}
export default ViewMenu;
