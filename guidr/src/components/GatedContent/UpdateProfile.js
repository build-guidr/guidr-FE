import React, { Component } from "react";
import ReactDOM from 'react-dom'
import axios from "axios";
import "./GatedContent.css";
import GatedContentNav from "./GatedContentNav";

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get("https://ls-guidr.herokuapp.com/api/profile")
      .then(result => {
        console.log(result.data);
        this.setState({
          user: result.data.find(
            user => `${user.user_id}` === localStorage.getItem("user_id")
          )
        });
      })
      .catch(error => console.log(`unable to load Data`, error));
  }

  updateUser = updatedUser => {
    console.log("hey",updatedUser);
   const id = this.state.user_id
    axios
      .put( 
        `https://ls-guidr.herokuapp.com/api/profile/${id}`,
        updatedUser
      )  
      
      .then(result => {console.log("HEY RES",result);
        this.setState({
          user: result.data.find(
            user => `${user.user_id}` === localStorage.getItem("user_id")
          )
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/portfolio/${id}`);
      })
      .catch(err => {
        // this.getUser()
        console.log("noOOO",err);
      });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({user: {
      ...this.state.user,
      [e.target.name]: e.target.value,
      
    }});
  };

  onSubmitEditedUser = e => {
    e.preventDefault();
    this.updateUser(this.state.user);
    this.setState({
      state: ''
    });
  };

  render() {
    return (
      <div className="main">
        <div className="trips-main-container">
         <GatedContentNav />
         <section data-aos="fade-in">
          <h2>Update Profile</h2>
          {/* {this.state.user.map(user => ( */}
            <div className="profile-content">
              <p> <strong>Guidr:</strong> {this.state.user.first_name} {this.state.user.last_name}</p>
              <p> <strong>Age:</strong> {this.state.user.age}</p>
              <p> <strong>About:</strong> {this.state.user.profile_text}</p>
              <p> <strong>Certification:</strong> {this.state.user.certs}</p>              
              <p> <strong>Years of Experience:</strong> {this.state.user.years_of_exp}</p>
            

          <div className="tabs">
          <form className="form" onSubmit={this.onSubmitEditedUser}>
          <input
              name="first_name"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.user.first_name}
            />
             <input
              name="last_name"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.user.last_name}
            />
            <input
              type="text"
              name="age"
              placeholder="age"
              onChange={this.handleChange}
              value={this.state.user.age}
            />
            <input
              type="text"
              name="certs"
              placeholder="certs"
              onChange={this.handleChange}
              value={this.state.user.certs}
            />
            <input
              type="text"
              name="profile_text"
              placeholder="Brief Description"
              onChange={this.handleChange}
              value={this.state.user.profile_text}
            />
            <input
              type="text"
              name="years_of_exp"
              placeholder="Years of Experience"
              onChange={this.handleChange}
              value={this.state.user.years_of_exp}
            />
           <button onClick={this.updateProfile}>SUBMIT CHANGES</button>
          </form>
          </div> 
          
        </div></section></div>
      </div>
    );
  }
}

export default UpdateProfile;

