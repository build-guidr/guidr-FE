import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import GatedContentNav from './GatedContentNav';
import axios from 'axios';
import AddProfile from './AddProfile';
import UpdateProfile from './UpdateProfile';
import './GatedContent.css';
// import PlacesForm from './PlacesForm'

export default class Portfolio extends Component {
	constructor() {
		super();
		this.state = {
			user: {}
		};
	}

	//display profile

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



  // delete 
  deleteUser = id => {
    axios
      .delete(`https://ls-guidr.herokuapp.com/api/profile/${id}`)
      .then(result => {
        console.log("DELETE AXIOS", result.data);
        this.setState({ user: result.data });
      })
      .catch(error => console.log(error));
  };

  deleteProfile = event => {
    event.preventDefault();
    console.log("DELETE HERE", this.state.user.id);
    this.deleteUser(this.state.user.user_id);
  };

	render() {
		const { user } = this.state;
		console.log(this.state);
		return (
			<div className="main">
				<div className="trips-main-container">
					<GatedContentNav />

					<section data-aos="fade-in">
						<h1>POTATO</h1>

						{/* <div className="tabs"> */}

						<div className="profile-content" key={user.id}>
							<p>
								{' '}
								<strong>Guidr:</strong> {user.first_name} {user.last_name}
							</p>
							<p>
								{' '}
								<strong>Age:</strong> {user.age}
							</p>
							<p>
								{' '}
								<strong>About:</strong> {user.profile_text}
							</p>
							<p>
								{' '}
								<strong>Certification:</strong> {user.certs}
							</p>
							<p>
								{' '}
								<strong>Years of Experience:</strong> {user.years_of_exp}
							</p>
							{/* DELETE PROFILE BUTTON */}
							{/* <button onClick={() => this.deleteUser(user.id)}>Delete Profile</button> */}
							{/* onClick={() => UpdateProfile(user.user_id) */}
							{/* <Route render={props => <AddProfile {...props} addUser={this.addUser}/>} /> */}
              {/* <Route render={(props) => <UpdateProfile {...props} updateUser={this.updateUser} />} /> */}
							<Link to="/update-portfolio">
								{console.log('WHAT', `/update-portfolio/updatedUser/${user.user_id}`)}
								{/* NOT LINK TO INDIVIDUAL ID WHY???!!!!! */}
								<button>EDIT PROFILE</button>
							</Link>
							
              {/* <Route render={(props) => <PlacesForm {...props}  />} /> */}
						</div>
						{/* </div> */}
					</section>
				</div>
			</div>
		);
	}
}
