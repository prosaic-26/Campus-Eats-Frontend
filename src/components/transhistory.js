import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"
import "./transhistory.css"

class TransHistory extends Component{
  state={
    user:this.props.location.state.user,
    orders:[{student:{username:"no one"},items:[],quantity:[],outlet:{}}],
    loadStatus:false
  }
  componentWillMount(){
      axios.post("/stuhistory",{user:this.state.user}).then(res =>{
        this.setState({orders:res.data.orders,loadStatus:true});
        console.log(this.state.orders);
      });
  }
  render(){

    var myOrders=this.state.orders;
    myOrders= myOrders.map(function(order, index){
      var items = order.items;
      var date = new Date(order.orderdate);
      console.log(date);
      var time = date.toString().slice(4,21);
      items = items.map(function(item,index){

        return(
          <div className="thorder-list">
            <span className={item.name+" thorderitem"}>
            <div className="thorderitem-left">
                <div className="thorderitem-name1"><b>{item.name}</b></div>
                <div className="thorderitem-nov"><i className={item.nov+" fa fa-circle"} aria-hidden="true"></i></div>
              </div>
              <div className="thorderitem-right">
                <div className="thitemTotalPrice1" ><span id="thtotalLabel">Total : ₹</span>{order.quantity[index]*item.price}</div>
              </div>
            </span>
            <span className="thorderitem-quantity">
                {"x "+order.quantity[index]}
            </span>
          </div>
        );
      }.bind(this));

        return(
          <div className="thoutlet-name1">
          <div className="thoutlet-name"><div className="thorder-outlet-name">{order.outletname}</div>
              <div className="thorder-status">{"Status: "+order.status}</div>
              <div className="thstu-order-time">{time}</div>
              <hr className="thoutlet-title-hor"></hr>
          </div>
          <div>{items}</div>
          </div>
        );
    }.bind(this));


    if(this.state.loadStatus==false){
      return(
        <div className="thcover">
          <Navbar user={this.state.user} />
        <div className="thload-div">
        <div class="thspinner">
            <div class="thcube1"></div>
            <div class="thcube2"></div>
        </div>
        </div>
        </div>
      )
    }

    return(
      <div className="thcover">
        <Navbar user={this.state.user} />
        <div class="thmot-div">
            <h1 className="th-title">{"History"}</h1>
        </div>
        <div className="thorder-div">
            <div class="thorder-inner">{myOrders}</div>
        </div>

      </div>
    );
  }
}
export default TransHistory;