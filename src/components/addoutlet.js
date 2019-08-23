import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Navbar from './navbar.js';
import './addoutlet.css'


class AddOutlet extends Component{
    state={
      user:{username:"no one",flag:"loggedout",image:{},imageUrl:"No url"},
      imgstatus:false
    }
    componentWillMount(){
      this.setState(this.props.location.state);
    }
    render(){
      this.selectImages = this.selectImages.bind(this);
      this.register = this.register.bind(this);
      return(
      <div className="cover">
      <Navbar user={this.state.user}/>
      <div className="outlet-page">
      <h1 className="outlet-add-header">Add Outlet</h1>
      <div className="outlet-div">
      <form onSubmit={this.register}>
      <div className="form-tab">
      <div className="form-tab-left"><p>Name:</p></div>
      <div className="form-tab-right"><input type="text" className="outlet-add-field" placeholder="Name of the outlet" ref="name"/></div>
      </div>
      <div className="form-tab">
      <div className="form-tab-left"><p>Location:</p></div>
      <div className="form-tab-right"><input type="text" className="outlet-add-field" placeholder="Location of the outlet" ref="location"/></div>
      </div>
      <div className="form-tab des">
      <div className="form-tab-left"><p>Description:</p></div>
      <div className="form-tab-right"><textarea className="text-area" ref="description"/></div>
      </div>
      <div className="form-tab">
      <div className="form-tab-left"><p>Phone No:</p></div>
      <div className="form-tab-right"><input type="text" className="outlet-add-field" placeholder="Phone number" ref="mobno"/></div>
      </div>
      <div className="form-tab">
      <div className="form-tab-left"><p>Username:</p></div>
      <div className="form-tab-right"><input type="email" className="outlet-add-field" placeholder="Email" ref="username"/></div>
      </div>
      <div className="form-tab">
      <div className="form-tab-left"><p>Password:</p></div>
      <div className="form-tab-right"><input type="password" className="outlet-add-field" placeholder="Enter password" ref="password"/></div>
      </div>
      <div className="form-tab">
      <div className="form-tab-left"><p>Password:</p></div>
      <div className="form-tab-right"><input type="password" className="outlet-add-field" placeholder="Re-enter password" ref="repassword"/></div>
      </div>
      <div className="form-tab">
      <div className="form-tab-left"><p>Image:</p></div>
      <div className="form-tab-right"><input type="file" className="outlet-add-field file-input" onChange={this.selectImages}/></div>
      </div>
      <input type="submit" id="outlet-submit" />
      </form>
      </div>
      </div>
      </div>
    );
    }
    selectImages = (event) => {
  console.log(event.target.files);
  /*let images = []
  for (var i = 0; i < event.target.files.length; i++) {
  images[i] = event.target.files.item(i);
  console.log("hi");
  }
  images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
  let message = `${images.length} valid image(s) selected`*/
  var image = event.target.files.item(0);
  this.setState({image:image,imgstatus:true});
  console.log(this.state.image);
  }
  register = (e) => {
      e.preventDefault();
  /*  const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);
      // Make an AJAX upload request using Axios
      return axios.post("http://localhost:3050/upload", data)
      .then(response => {
      this.setState({
      imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
    });
      });
      });
      // Once all the files are uploaded
      axios.all(uploaders).then(() => {
      console.log('done');
    }).catch(err => alert(err.message));*/
      const data = new FormData();
      console.log(this.state.imgstatus);
      if(this.state.imgstatus==false){
        alert("Please select a image");
        return;
      }
      data.append("image",this.state.image,this.state.image.name);
      axios.post("/upload",data).then(res=>{
        this.setState({imageUrl:res.data.imageUrl});
        console.log(this.state.imageUrl);
      });
      var p = this.refs.password.value;
      var rp = this.refs.repassword.value;
      var u = this.refs.username.value;
      var n = this.refs.name.value;
      var m = this.refs.mobno.value;
      if(p!==rp){
        alert("Passwords are not same");
        return;
      }
      axios.post("/createoutletacc",{username:this.refs.username.value,
                                                password:this.refs.password.value,
                                                name:n,
                                                mobno:m,
                                                     }).then(res => {
        console.log(res.data.user);
        if(res.data.status==true)
           alert("Outlet Registered successfully");
        else if(res.data.status==false){
          alert(res.data.error.message);
          return;
        }
        var user=res.data.user;
        axios.post("/createoutlet",{
          name:this.refs.name.value,
          location:this.refs.location.value,
          description:this.refs.description.value,
          image:this.state.imageUrl,
          user:user
        }).then(res=>{
          console.log("Hiii");
          console.log(res.data.outlet.owner);
        })
      });
   }
  }
export default AddOutlet;
