import React, { Component } from "react";
import axios from "axios";
import "./GatedContent.css";

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }


  componentDidMount() {
   this.getUser()
  }

  getUser = () => {
    const endpoint = "https://ls-guidr.herokuapp.com/api/profile";
    axios
      .get(endpoint)
      .then(response => {
        this.setState({
          first_name: response.data[0].first_name, last_name: response.data[0].last_name, age: response.data[0].age, 
          certs: response.data[0].certs, profile_text: response.data[0].profile_text,
          years_of_exp: response.data[0].years_of_exp, user_id: response.data[0].user_id
        
        });
        
      })
      .catch(error => {
        console.error("ERROR", error);
      });
  }

  updateUser = updatedUser => {
    console.log("hey",updatedUser);
   const id = this.state.user_id
    axios
      .put( 
        `https://ls-guidr.herokuapp.com/api/profile/${id}`,
        updatedUser
      )
      .then(res => {
        const user = res.data;
        this.setState({ 
          user
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/profile/${id}`);
      })
      .catch(err => {
        this.getUser()
        console.log("noOOO",err);
      });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmitEditedUser = e => {
    e.preventDefault();
    this.updateUser(this.state);
  };

  render() {
    return (
      <div className="main">
         <div className="trips-main-container">
          <h2>Update Profile</h2>
          <form className="form" onSubmit={this.onSubmitEditedUser}>
          <input
              name="first_name"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.first_name}
            />
             <input
              name="last_name"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.last_name}
            />
            <input
              type="text"
              name="age"
              placeholder="age"
              onChange={this.handleChange}
              value={this.state.age}
            />
            <input
              type="text"
              name="certs"
              placeholder="certs"
              onChange={this.handleChange}
              value={this.state.certs}
            />
            <input
              type="text"
              name="profile_text"
              placeholder="Brief Description"
              onChange={this.handleChange}
              value={this.state.profile_text}
            />
            <input
              type="text"
              name="years_of_exp"
              placeholder="Years of Experience"
              onChange={this.handleChange}
              value={this.state.years_of_exp}
            />
           <button onClick={this.updateProfile}>Update Profile</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;