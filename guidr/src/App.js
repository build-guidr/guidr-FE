import React, { Component } from "react";
import Login from "./components/Login/Login";
import GuidrTrips from "./components/GuidrContent/GuidrTrips";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";

class App extends Component {
  login = creds => {
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <h1>Guidr</h1>
        <Route
          exact
          path="/"
          render={props => <Login {...props} login={this.login} />}
        />
        <PrivateRoute path="/my-trips" component={GuidrTrips} />
      </div>
    );
  }
}

export default App;
