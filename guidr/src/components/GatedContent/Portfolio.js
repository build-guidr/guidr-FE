import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import axios from 'axios'
import AddProfile from "./AddProfile";
import UpdateProfile from './UpdateProfile';

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
    .catch(error => console.log(`unable to load Data`));
}
  //update
  // updateProfile = updatedProfile => {
  //   axios
  //     .put( `https://ls-guidr.herokuapp.com/api/profile/${updatedProfile.id}`, updatedProfile)
  //     .then(result => { console.log(result)
  //       this.setState({ Profiles: result.data });
  //       console.log(result);
  //       // redirect
  //       this.props.history.push(`/profile/${updatedProfile.id}`);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // delete
  deleteUser = id => {
    axios
      .delete(`https://ls-guidr.herokuapp.com/api/profile/${id}`)
      .then(result => {console.log("DELETE AXIOS", result.data)
          this.setState({ user: result.data }); 
        })
      .catch(error => console.log(error))
  }

  deleteProfile = () => {
    // event.preventDefault(); 
    console.log("DELETE HERE",this.state.user.id)
    this.deleteUser(this.state.user.id);
  };

  // updateProfile = event => {
  //   event.preventDefault(); console.log("EDIT HERE",this.user.id)
  //   this.props.history.push(`/edit-profile/${this.user.id}`);
  // };

  
  render() {
    return (
      <div className="main">
         <div className="trips-main-container">
          <GatedContentNav />
        </div>
        <section className="content-box" data-aos="fade-in">
        <h1>Portfolio</h1>
        
        <div className="tabs">
          {this.state.user.map(user => (
            <div key={user.id}>
              <p> <strong>Guidr:</strong> {user.first_name} {user.last_name}</p>
              <p> <strong>Age:</strong> {user.age}</p>
              <p> <strong>About:</strong> {user.profile_text}</p>
              <p> <strong>Certification:</strong> {user.certs}</p>              
              <p> <strong>Years of Experience:</strong> {user.years_of_exp}</p>
              {/* <button onClick={this.updateProfile}>Update Profile</button> */}
              <button onClick={this.deleteProfile}>Delete Profile</button>
              <Route render={props => <UpdateProfile {...props} updateUser={this.updateUser}/>} />
              {/* <Route render={props => <AddProfile {...props} addUser={this.addUser}/>} /> */}
              {/* <Route path={this.props.UpdateProfile} component={UpdateProfile} /> */}
              <Link to={this.props.UpdateProfile} onClick={() => UpdateProfile(user.user_id)}>
              {console.log("WHAT",`/my-portfolio/updatedUser/${user.user_id}`)}
              {/* NOT LINK TO INDIVIDUAL ID WHY???!!!!! */}
                <p>Details</p>
              </Link>
            </div>
          ))}
        </div>
        </section>
      </div>
    );
  }
}

