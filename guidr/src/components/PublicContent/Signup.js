import React, { Component } from "react";
import axios from "axios";
import PublicContentNav from "./PublicContentNav";

export default class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <div>
          <PublicContentNav />
        </div>
        <form onSubmit={this.handleSignup}>
          <div>
            <label htmlFor="username" />
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
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
