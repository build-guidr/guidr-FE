import React, { Component } from "react";
import axios from "axios";
import PublicContentNav from "./PublicContentNav";
import "./PublicContent.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLogin = event => {
    event.preventDefault();

    const endpoint = "https://ls-guidr.herokuapp.com/api/auth/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log("LOGIN RESPONSE", res);
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/my-portfolio");
      })
      .catch(error => {
        console.error("LOGIN ERROR", error);
      });
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="public-content-main-container">
        <div className="public-content-nav-container">
          <PublicContentNav />
        </div>
        <div className="form-container">
          <form onSubmit={this.handleLogin} className="form-field-section">
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <Button variant="primary" size="lg">
              LOG IN
            </Button>
            <div className="create-account-link-text">
              <p>or</p>
              <Link to="/signup">Create an Account</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
