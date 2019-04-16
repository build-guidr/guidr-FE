import React, { Component } from "react";
import axios from "axios";
import PublicContentNav from "./PublicContentNav";

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
        localStorage.setItem("token", res.data.password);
        this.props.history.push("/my-trips");
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
      <div>
        <div>
          <PublicContentNav />
        </div>
        <form onSubmit={this.handleLogin}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
