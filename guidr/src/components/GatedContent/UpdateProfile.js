import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./GatedContent.css";
import GatedContentNav from "./GatedContentNav";
import Footer from "./Footer";
// import UpdateModal from "./UpdateModal";

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
    return axios
      .put(
        `https://ls-guidr.herokuapp.com/api/profile/${updatedUser.id}`,
        updatedUser
      )
      .then(result => {
        console.log("HEY RES", result);
        this.setState({
          user: result.data.find(
            user => `${user.user_id}` === localStorage.getItem("user_id")
          )
        });
        console.log("success!");

        // redirect
        this.props.history.push("/my-portfolio");
      })
      .catch(err => {
        // this.getUser()
        console.log("noOOO", err);
      });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitEditedUser = e => {
    e.preventDefault();
    this.updateUser(this.state.user).then(state => {
      this.setState({
        state: ""
      });
      this.props.history.push("/my-portfolio");
    });
  };

  render() {
    return (
      <div className="main">
        <div className="trips-main-container">
          <GatedContentNav />
          {/* <section> */}
          <section className="content-box-update-profile">
            <h1>Update Profile</h1>
            <div className="updated-content-display">
              <div className="update-content">
                <p>
                  <h2>Guidr:</h2> {this.state.user.first_name}
                  {this.state.user.last_name}
                </p>
                <p>
                  <h2>Age:</h2> {this.state.user.age}
                </p>
                <p>
                  <h2>About:</h2> {this.state.user.profile_text}
                </p>
                <p>
                  <h2>Certification:</h2> {this.state.user.certs}
                </p>
                <p>
                  <h2>Years of Experience:</h2> {this.state.user.years_of_exp}
                </p>
              </div>
              <div className="tabs-update-content">
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
                  <button
                    onClick={this.updateProfile}
                    className="update-button"
                  >
                    SUBMIT CHANGES
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
export default UpdateProfile;
