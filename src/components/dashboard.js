import React, { Component } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import "./load.css";
import "./dashboard.css";

class Dashboard extends Component{
  state={
    onum:0,
    snum:0,
    rnum:0,
    user:this.props.location.state.user,
    loadStatus:false,
    bar1:{
      options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Yummpys","Zomato","Swiggy","Uber eats"]
          }
        },
        series: [
          {
            name: "sales",
            data: [30, 40, 45, 50]
          }
        ]
    },
    bar2:{
      options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Yummpys","Zomato","Swiggy","Uber eats"]
          }
        },
        series: [
          {
            name: "orders",
            data: [30, 40, 45, 50]
          }
        ]
    }
  }
  componentWillMount(){
    axios.post("/stats",{}).then(res=>{
      this.setState({onum:res.data.onum,snum:res.data.snum,rnum:res.data.rnum});
      console.log(this.state);
    });
    axios.post("/chartstats",{}).then(res =>{
      var bar1 = this.state.bar1;
      bar1.options.xaxis.categories=res.data.ots;
      bar1.series[0].data=res.data.series;
      var bar2 = this.state.bar2;
      bar2.options.xaxis.categories=res.data.ots;
      bar2.series[0].data=res.data.s2;
      this.setState({bar1:bar1,bar2:bar2,loadStatus:true});
      console.log(this.state.bar);
    })
  }
  render(){
    var d = new Date();
    var s = d.toString().substr(4,17);
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
      <div className="dashboard">
        <h1 className="dash-title">DASHBOARD</h1>
        <div className="dash-upper">
           <div className='dash-udiv'>
            <div className="dash-ut utorange">Total Sales</div>
              <div className="dash-um">{"Rs."+this.state.snum}</div>
              <div className="dash-ub">{"As of "+s}</div>
           </div>
           <div className='dash-udiv'>
            <div className="dash-ut utblue">Total orders</div>
              <div className="dash-um">{this.state.onum}</div>
              <div className="dash-ub">{"As of "+s}</div>
           </div>
           <div className='dash-udiv'>
            <div className="dash-ut utgreen">Total Reviews</div>
              <div className="dash-um">{this.state.rnum}</div>
              <div className="dash-ub">{"As of "+s}</div>
           </div>
           <div className='dash-udiv'>
            <div className="dash-ut utorange">Total Outlets</div>
              <div className="dash-um">4</div>
              <div className="dash-ub">{"As of "+s}</div>
           </div>
        </div>
        <div className="dash-lower">
          <h1 className='dash-lt'>Performance</h1>
          <div className="dash-ll">
          <Chart
           options={this.state.bar1.options}
           series={this.state.bar1.series}
           type="bar"
           width="500"
         />
         <h2 className="chart-t">Total Sales</h2>
         <div className="dash-ub">{"As of "+s}</div>

          </div>
          <div className="dash-lr">
          <Chart
              options={this.state.bar2.options}
              series={this.state.bar2.series}
              type="bar"
              width="500"
            />
            <h2 className="chart-t">Total Orders</h2>
            <div className="dash-ub">{"As of "+s}</div>

            </div>
        </div>
      </div>
      </div>
    )
  }
}
export default Dashboard;
