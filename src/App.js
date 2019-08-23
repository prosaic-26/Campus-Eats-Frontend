import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './components/home.js';
import Login from './components/login.js';
import Register from './components/register.js';
import AddOutlet from './components/addoutlet.js';
import MyOutlet from './components/myoutlet.js';
import MyMenu from './components/mymenu.js';
import Outlets from './components/outlets.js';
import ViewMenu from './components/viewmenu.js';
import ViewCart from './components/viewcart.js';
import StudentOrders from './components/studentorders';
import OutletOrders from './components/outletorders';
import OInfo from './components/info';
import TransHistory from './components/transhistory';
import Dashboard from './components/dashboard';

//import logo from './logo.svg';
//import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/addoutlet' component={AddOutlet} />
        <Route path='/myoutlet' component={MyOutlet} />
        <Route path='/mymenu' component={MyMenu} />
        <Route path='/outlets' component={Outlets} />
        <Route path='/viewmenu' component={ViewMenu} />
        <Route path='/cart' component={ViewCart} />
        <Route path='/myorders' component={StudentOrders} />
        <Route path='/orders' component={OutletOrders} />
        <Route path='/oinfo' component={OInfo} />
        <Route path='/history' component={TransHistory} />
        <Route path='/dash' component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}



export default App;
