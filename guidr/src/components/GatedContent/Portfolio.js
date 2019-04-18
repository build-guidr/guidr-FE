import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import axios from "axios";
import AddProfile from "./AddProfile";
import UpdateProfile from "./UpdateProfile";
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
    return (
      <div className="main">
        <div className="trips-main-container">
          <GatedContentNav />
        </div>
        <section>
          <h1>Portfolio</h1>

          <p>{this.state.user.first_name}</p>
        </section>
      </div>
    );
  }
}
