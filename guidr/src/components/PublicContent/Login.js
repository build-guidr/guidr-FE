import React, { Component } from "react";
import axios from "axios";
import PublicContentNav from "./PublicContentNav";
import "./PublicContent.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

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
        localStorage.setItem("user_id", res.data.id);
        this.props.history.push(`/my-trips/${res.data.id}`);
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
    AOS.init();
    return (
      <div className="public-content-main-container">
        <div
          className="public-content-nav-container"
          data-aos="fade-down-right"
          data-aos-duration="600"
        >
          <PublicContentNav />
        </div>
        <div
          className="form-container"
          data-aos="fade-down-left"
          data-aos-duration="600"
        >
          <form onSubmit={this.handleLogin} className="form-field-section">
            <h2>LOGIN</h2>
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
            <button>LOG IN</button>
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
