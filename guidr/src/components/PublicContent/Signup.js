import React, { Component } from "react";
import axios from "axios";
import PublicContentNav from "./PublicContentNav";
import "./PublicContent.css";

export default class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div className="public-content-main-container">
        <div className="public-content-nav-container">
          <PublicContentNav />
        </div>
        <form onSubmit={this.handleSignup} className="signup-form">
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            id="username"
            type="text"
            placeholder="Username"
          />
          <input
            value={this.state.password}
            onChange={this.handleInputChange}
            id="password"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }

  handleSignup = event => {
    event.preventDefault();

    const register = {
      username: this.state.username,
      password: this.state.password
    };

    const endpoint = "https://ls-guidr.herokuapp.com/api/auth/register";
    axios
      .post(endpoint, register)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("REGISTER ERROR", error);
      });
  };

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
}
