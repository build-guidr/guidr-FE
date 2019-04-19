import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import axios from "axios";
import AddProfile from "./AddProfile";
import UpdateProfile from "./UpdateProfile";
import "./GatedContent.css";
import { Button } from "reactstrap";
// import PlacesForm from './PlacesForm'
import Footer from "./Footer";
import Loader from "react-loader-spinner";

export default class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true
    };
  }

  //display profile

  componentDidMount() {
    return axios
      .get("https://ls-guidr.herokuapp.com/api/profile")
      .then(result => {
        console.log(result.data);
        return this.setState({
          user: result.data.find(
            user => `${user.user_id}` === localStorage.getItem("user_id")
          )
        });
      })
      .catch(error => {
        console.log(`unable to load Data`, error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
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
    // const { user } = this.state;
    // console.log(this.state);

    if (!this.state.user)
      return (
        <div className="main">
          <div className="trips-main-container">
            <GatedContentNav />
            <section className="content-box">
              <div className="trips-content-container">
                <div className="get-started-content">
                  <div className="get-started-sub-container">
                    <div className="get-started-background" />
                    <div className="get-started-sub-container-content">
                      <p>Welcome to GuidR! </p>
                      <ul>
                        <div className="get-started-choices">
                          <li>
                            As a new user, you don't have a portfolio yet. To
                            start building a portfolio with your account, add
                            your first trip.
                          </li>
                          <Button size="lg">
                            <Link to="/add-trip">ADD A TRIP</Link>
                          </Button>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      );

    ///////////////////////////////////////
    // If data is supposed to come through, below code should render in the DOM.
    return (
      <>
        {this.state.loading && (
          <div class="loader-container">
            <Loader type="Plane" color="#00BFFF" height="100" width="100" />
          </div>
        )}
        {!this.state.loading && (
          <div className="main">
            <div className="trips-main-container">
              <GatedContentNav />
              <section>
                <h1>My Portfolio</h1>
                <div className="profile-content" key={this.state.user.id}>
                  <p>
                    {" "}
                    <strong>Guidr:</strong> {this.state.user.first_name}{" "}
                    {this.state.user.last_name}
                  </p>
                  <p>
                    {" "}
                    <strong>Age:</strong> {this.state.user.age}
                  </p>
                  <p>
                    {" "}
                    <strong>About:</strong> {this.state.user.profile_text}
                  </p>
                  <p>
                    {" "}
                    <strong>Certification:</strong> {this.state.user.certs}
                  </p>
                  <p>
                    {" "}
                    <strong>Years of Experience:</strong>{" "}
                    {this.state.user.years_of_exp}
                  </p>
                  {/* DELETE PROFILE BUTTON */}
                  {/* <button onClick={() => this.deleteUser(this.state.user.id)}>Delete Profile</button> */}
                  {/* onClick={() => UpdateProfile(this.state.user.user_id) */}
                  {/* <Route render={props => <AddProfile {...props} addUser={this.addUser}/>} /> */}
                  {/* <Route render={(props) => <UpdateProfile {...props} updateUser={this.updateUser} />} /> */}
                  <Link to="/update-portfolio">
                    {console.log(
                      "WHAT",
                      `/update-portfolio/updatedUser/${this.state.user.user_id}`
                    )}
                    {/* NOT LINK TO INDIVIDUAL ID WHY???!!!!! */}
                    <button>EDIT PROFILE</button>
                  </Link>

                  {/* <Route render={(props) => <PlacesForm {...props}  />} /> */}
                </div>
                {/* </div> */}
              </section>
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  }
}
