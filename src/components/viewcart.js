import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css"
import "./viewcart.css"
//My additon



// import "./default.css"
// import "./buttonfile.css"


class ViewCart extends Component{
  state={
    user:this.props.location.state.user,
    cart:{user:{username:"no one"},items:[]},
    quantity:[],
    loadStatus:false
  }
  componentWillMount(){
       axios.post("/viewcart",{user:this.state.user}).then(res => {
          this.setState({cart:res.data.cart,loadStatus:true});
          console.log(this.state.cart);

          var n= this.state.cart.items;
          var q = [];
          for(var i=0 ; i<n.length;i++){
            q.push(1);
          }
         this.setState({quantity:q});
         console.log("Hie  "+n.length);
       });


  }

  render(){

    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.removeItem = this.removeItem.bind(this);
    var btnClassNames=["place-order1","btn-3","icon-arrow-right","icon-large"].join(" ");
    /* place-order1 */
    var tot = this.calcTotal();
    var items=this.state.cart.items;
    items = items.map(function(item, index){

        return(
          <div className={item.name+" cartitem"}>
          <div className="cartitem-left">
              <div className="item-outlet"><b>{item.outletname}</b></div>
              <div className="cartitem-name"><b>{item.name}</b></div>
              <div className="cartitem-nov"><i className={item.nov+" fa fa-circle"} aria-hidden="true"></i></div>
              <div className="cartitem-category">{"Category: "+item.category}</div>
              <div className="titem-price">{"₹"+item.price+"/-"}</div>
            </div>
            <div className="cartitem-right">
              <button className="cartitem-buttonDec" id={"dec"+index} onClick={this.decQuantity}>&minus;</button>
              <div className="cartitem-quantity">
                  {this.state.quantity[index]}
              </div>
               <button className="cartitem-buttonInc" id={"inc"+index} onClick={this.incQuantity}>+</button>
               <button className="buttonRemove" id={"rbut"+index} onClick={this.removeItem}>Remove</button>
            <div className="itemTotalPrice1" ><span id="totalLabel">Total : ₹</span>{this.state.quantity[index]*item.price}</div>
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
            <div class="ct-div">
            <h1 className="mycart-title">{"My Cart"}</h1>
            </div>
            <div className="cart-div">
                <div class="cart-inner">{items}</div>
                <div className="sticky">
                    <span className="totalPrice1">{"Bill Total: ₹"+tot}</span>
                    <button className={btnClassNames} id="btn-click" onClick={this.placeOrder}>Place Order</button>
                </div>
            </div>
      </div>

    );

  }
  removeItem(e){
    var d = e.target.id[4];
    axios.post("/removecartitem",{user:this.state.user,index:e.target.id[4]}).then(res =>{
       if(res.data.status==true){
         alert("Item successfully removed");
         var cart=this.state.cart;
         cart.items.splice(d,1);
         this.setState({cart:cart});
       }
    })
  }
  incQuantity(e){
      var qty = this.state.quantity;
      var index = e.target.id[3];
      if(qty[index]<5){
        qty[index]=qty[index]+1;
      }
      console.log(qty[index]);
      this.setState({quantity:qty});
    }

    decQuantity(e){
      var qty = this.state.quantity;
      var index = e.target.id[3];
      if(qty[index]>1){
        qty[index]=qty[index]-1;
      }

      console.log(qty);
      this.setState({quantity:qty});
    }

    calcTotal(){
        var n= this.state.cart.items;
        var q = this.state.quantity;
        var total = 0;
        for(var i=0 ; i<n.length;i++){
          total = total+n[i].price*q[i];
        }
        console.log("Price: "+ total);
        return total;
    }

  placeOrder(e){
    console.log(this.state.quantity);
    console.log(this.state.cart.items);
    if(this.state.cart.items.length==0){
      alert("Cart is empty");
      return;
    }
    axios.post("/placeorder",{user:this.state.user,quantity:this.state.quantity,items:this.state.cart.items}).then(res => {
      if(res.data.status==true)
        alert("Order(s) placed succesfully");
        var c = this.state.cart;
        c.items=[];
        this.setState({cart:c});
    });

  }
  getOrder(e){
    axios.post("/getorders",{user:this.state.user}).then(res => {
      console.log("Hi-2");
    });
  }
}
export default ViewCart;
