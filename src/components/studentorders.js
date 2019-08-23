import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"
import "./studentorders.css"

class StudentOrders extends Component{
  state={
    user:this.props.location.state.user,
    orders:[{student:{username:"no one"},items:[],quantity:[],outlet:{}}],
    loadStatus:false
  }
  componentWillMount(){
    axios.post("/getstudentorders",{user:this.state.user}).then(res=>{
      this.setState({orders:res.data.orders,loadStatus:true});
      console.log(this.state.orders);
    });
  }
  render(){

    var myOrders=this.state.orders;
    myOrders= myOrders.map(function(order, index){
      var items = order.items;
      var date = new Date(order.orderdate);
      var time = date.toString().slice(15,21);
      console.log(time);
      items = items.map(function(item,index){

        return(
          <div className="order-list">
            <span className={item.name+" orderitem"}>
            <div className="orderitem-left">
                <div className="orderitem-name1"><b>{item.name}</b></div>
                <div className="orderitem-nov"><i className={item.nov+" fa fa-circle"} aria-hidden="true"></i></div>
              </div>
              <div className="orderitem-right">
                <div className="itemTotalPrice1" ><span id="totalLabel">Total : ₹</span>{order.quantity[index]*item.price}</div>
              </div>
            </span>
            <span className="orderitem-quantity">
                {"x "+order.quantity[index]}
            </span>
          </div>
        );
      }.bind(this));

        return(
          <div className="outlet-name1">
          <div className="outlet-name"><div className="order-outlet-name">{order.outletname}</div>
              <div className="order-status">{"Status: "+order.status}</div>
              <div className="stu-order-time">{"Ordered at "+time}</div>
              <hr className="outlet-title-hor"></hr>
          </div>
          <div>{items}</div>
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
        <div class="mot-div">
            <h1 className="myorder-title">{"My Order"}</h1>
        </div>
            <div className="order-div">
                <div class="order-inner">{myOrders}</div>
            </div>
      </div>
    )
  }
}
export default StudentOrders;
