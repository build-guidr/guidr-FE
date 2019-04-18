import React, { Component } from "react";
import axios from "axios";
import PublicContentNav from "./PublicContentNav";
import "./PublicContent.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

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
        <div className="form-container">
          <form onSubmit={this.handleSignup} className="form-field-section">
            <h2>SIGNUP</h2>
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              id="username"
              type="text"
              placeholder="USERNAME"
            />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              id="password"
              type="password"
              placeholder="PASSWORD"
            />

            <Button variant="primary" size="lg">
              <Link to="/">CREATE ACCOUNT</Link>
            </Button>
            <div className="create-account-link-text">
              <p>
                Already have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </form>
        </div>
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
