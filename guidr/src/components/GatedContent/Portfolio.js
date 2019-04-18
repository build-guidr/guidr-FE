import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import axios from 'axios'
import AddProfile from "./AddProfile";
import UpdateProfile from './UpdateProfile';
import "./GatedContent.css";

export default class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  // read
  componentDidMount() {
    axios 
    .get('https://ls-guidr.herokuapp.com/api/profile')
    .then(result => { console.log(result.data)
      this.setState({ user: result.data });
    })
    .catch(error => console.log(`unable to load Data`, error));
}
 
  // delete
  deleteUser = id => {
    axios
      .delete(`https://ls-guidr.herokuapp.com/api/profile/${id}`)
      .then(result => {console.log("DELETE AXIOS", result.data)
          this.setState({ user: result.data }); 
        })
      .catch(error => console.log(error))
  }

  deleteProfile = (event) => {
    event.preventDefault(); 
    console.log("DELETE HERE",this.state.user.id)
    this.deleteUser(this.state.user.user_id);
  };

  render() {
    return (
      <div className="main">
         <div className="trips-main-container">
          <GatedContentNav />
        </div>
        <section data-aos="fade-in">
        <h1>Portfolio</h1>
        
        {/* <div className="tabs"> */}
          {this.state.user.map(user => (
            <div className="profile-content" key={user.id}>
              <p> <strong>Guidr:</strong> {user.first_name} {user.last_name}</p>
              <p> <strong>Age:</strong> {user.age}</p>
              <p> <strong>About:</strong> {user.profile_text}</p>
              <p> <strong>Certification:</strong> {user.certs}</p>              
              <p> <strong>Years of Experience:</strong> {user.years_of_exp}</p>
              {/* DELETE PROFILE BUTTON */}
              <button onClick={ () => this.deleteUser(user.id)}>Delete Profile</button>
              
              {/* <Route render={props => <AddProfile {...props} addUser={this.addUser}/>} /> */}
              <Link to={this.props.UpdateProfile} onClick={() => UpdateProfile(user.user_id)}>
              {console.log("WHAT",`/my-portfolio/updatedUser/${user.user_id}`)}
              {/* NOT LINK TO INDIVIDUAL ID WHY???!!!!! */}
                <p>Details</p>
              </Link>
              <Route render={props => <UpdateProfile {...props} updateUser={this.updateUser}/>} />
            </div>
          ))}
        {/* </div> */}
        </section>
      </div>
    );
  }
}

