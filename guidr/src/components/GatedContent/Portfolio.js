import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import GatedContentNav from './GatedContentNav';
import axios from 'axios';
import AddProfile from './AddProfile';
import UpdateProfile from './UpdateProfile';
import './GatedContent.css';


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
          <img className="img-dae" src="https://www.telltalesonline.com/wp-content/uploads/2015/05/Daenerys-Targaryen-Dragon.jpg" alt="Girl in a jacket"/>

						{/* <div className="tabs"> */}

						<div className="user-content" key={user.id}>
							<p>
								{' '}
								<h1 className="profile-h1">{user.first_name} {user.last_name} </h1>
							</p>
							<p>
								{' '}
								<h2>Age:</h2> {user.age}
							</p>
							<p>
								{' '}
								<h2>About:</h2> {user.profile_text}
							</p>
							<p>
								{' '}
								<h2>Certification:</h2> {user.certs}
							</p>
							<p>
								{' '}
								<h2>Years of Experience:</h2> {user.years_of_exp}
							</p>
							{/* DELETE PROFILE BUTTON */}
							{/* <button onClick={() => this.deleteUser(user.id)}>Delete Profile</button> */}
							{/* onClick={() => UpdateProfile(user.user_id) */}
							{/* <Route render={props => <AddProfile {...props} addUser={this.addUser}/>} /> */}
              {/* <Route render={(props) => <UpdateProfile {...props} updateUser={this.updateUser} />} /> */}
							<Link to="/update-portfolio">
								{/* NOT LINK TO INDIVIDUAL ID WHY???!!!!! */}
								<button className="profile-button">EDIT PROFILE</button>
							</Link>
							
              {/* <Route render={(props) => <PlacesForm {...props}  />} /> */}
						</div>	
            </section>
					</div>
	    </div>
      
		);
	}
}
