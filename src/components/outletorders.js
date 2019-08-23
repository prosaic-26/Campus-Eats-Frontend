import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"
import "./outletorders.css"

class Outletorders extends Component{
  state={
    user:this.props.location.state.user,
    outlet:{owner:{username:"no one"},menu:[]},
    orders:[{student:{username:"no one"},items:[],quantity:[],outlet:{}}],
    loadStatus:false
  }
  componentWillMount(){
    axios.post("/myoutlet",{user:this.state.user.username}).then(res=>{
      this.setState({outlet:res.data.outlet});
      console.log(this.state.outlet);
      axios.post("/getoutletorders",{outlet:this.state.outlet}).then(res => {
        this.setState({orders:res.data.orders,loadStatus:true});
        console.log(this.state.orders);
      })
    });
  }
    render(){
      this.statusChange = this.statusChange.bind(this);
      var orders=this.state.orders;
      orders=orders.map(function(order,index){
        var tot_price=0;
        var items=order.items;
        items=items.map(function(item,index){
          tot_price+=order.quantity[index]*item.price;
          return(
            <div className={item.name+" outorderitem"}>
                <div className={"outorderitem-name "+item.nov}><b>{item.name}</b></div>
                <div className="outorderitem-qty">Qty: <b>{order.quantity[index]}</b></div>
                <div className="outorderitem-price"><b>Rs.{item.price*order.quantity[index]}</b></div>
            </div>
          )
        }.bind(this));
        var date = new Date(order.orderdate);
      return(
        <div className={order+" outorderdiv"}>
        <div className="outorderNo">{order._id}</div>
          <div className="outorder-cust" id="cust">Customer: <b>{order.student.username}</b></div>
          <div className="out-items"><div className="item-order">Order:</div>{items}</div>
          <div id="ostatus">
            <div className="stitle" id={"o-st"+index}>Status : <b className="orst">{order.status}</b></div>
            <div className="dd-div">
            <select id={"drop-down"+index} className="drop-down" onChange={this.statusChange}>
            <option className="order-option" selected disabled hidden value="none">Select Status</option>
            <option className="order-option" value="received">Received</option>
            <option className="order-option"  value="pending">Pending</option>
              <option className="order-option" value="ready">Ready</option>
              <option className="order-option" value="delivered">Delivered</option>
            </select>
            </div>
          </div>
          <div className="order-footer">
            <div className="order-time">Time: <b>{date.toString().slice(15,21)}</b></div>
            <div className="order-total" id="total">Total: Rs.<b>{tot_price}</b></div>
          </div>
        </div>
      )
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

      <div className="outorders-div">
      <h1 className="outorders-title">{"Outlet orders"}</h1>
      <div className="outorders-div-inner">
          <div class="cart-inner">{orders}</div>
      </div>
      </div>
      </div>
    )
  }
  statusChange(e){
    var d = document.querySelector("#"+e.target.id);
    var ind =  e.target.id[9];
    axios.post("/cstatus",{order:this.state.orders[ind],status:d.value}).then(res => {
      if(res.data.status==true)
        var orders= this.state.orders;
        orders[ind].status=d.value;
        this.setState({orders:orders});
    })
  }
}
export default Outletorders;
