import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./myoutlet.css"

class MyOutlet extends Component{
  state={
    user:this.props.location.state.user,
    outlet:{owner:{username:"no one"},menu:[]},
    reviews:[{studentname:"",student:{name:""}}],
    loadStatus:true
  }
  componentWillMount(){
    this.setState(this.props.location.state);
    axios.post("/myoutlet",{user:this.state.user.username}).then(res=>{
      this.setState({outlet:res.data.outlet,loadStatus:true});
      console.log("hi");
      console.log(this.state.outlet);
      axios.post("/getreviews",{outlet:this.state.outlet}).then(res =>{
          console.log(res.data.reviews);
          this.setState({reviews:res.data.reviews});
      });
    });

  }
  render(){

    this.clicked=this.clicked.bind(this);
    var reviews = this.state.reviews;
    reviews=reviews.map(function(review,index){
      return(
        <div className="o-review">
        <div className="review-name">{review.student.name}</div>
        <div className="review-content">{review.content}</div>
        </div>
    )
    })
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
      <div className="my-outlet-box">
      <div className="my-back-image">
        <h1 className="my-outlet-title">MY OUTLET</h1>
      </div>
          <div className="my-outlet-inner">
          <div className="my-outlet-inner2">
          <h2 className="my-info-outlet-name">{this.state.outlet.name}</h2>
          <img src={"/"+this.state.outlet.image} className="my-outlet-image" />
          <div className="my-outlet-info">
            <div className="my-fi-1"><b>Location:</b></div>
            <div classname="my-fi-2">{this.state.outlet.location}</div>
          </div>
          <div className="my-outlet-info">
            <div className="my-fi-1"><b>Owner:</b></div>
            <div classname="my-fi-2">{this.state.outlet.owner.username}</div>
          </div>
          <div className="my-outlet-info">
            <div className="my-fi-1"><b>Mobile No:</b></div>
            <div classname="my-fi-2">{this.state.outlet.owner.mobno}</div>
          </div>
          <div className="my-outlet-info des">
            <div className="my-fi-1 oid"><b>Description:</b></div>
            <div classname="my-fi-2" id="my-outlet-information">{this.state.outlet.description}</div>
          </div>
          <div className="my-outlet-info">
            <div className="my-fi-1"><b>Rating:</b></div>
            <div classname="my-fi-2">4.5</div>
          </div>
          </div>
          </div>
          <div className="my-outlet-reviews-outer">
              <h1 className="my-o-reviews-head">Reviews</h1>
              <div className="my-o-reviews-inner">{reviews}</div>
          </div>
      </div>
      </div>

    );
  }
  clicked(e){
    console.log(this.state.outlet.owner);
  }
}
export default MyOutlet;
