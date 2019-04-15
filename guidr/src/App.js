import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import axios from "axios";

import "./App.css";
import PublicContentNav from "./components/PublicContent/PublicContentNav";
import GatedContentNav from "./components/GatedContent/GatedContentNav";
import Trips from "./components/GatedContent/Trips";
import Login from "./components/PublicContent/Login";
import Signup from "./components/PublicContent/Signup";
import Portfolio from "./components/GatedContent/Portfolio";
axios.defaults.baseURL =
  process.env.API_URL || "https://ls-guidr.herokuapp.com/api/";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route path="/signup" render={props => <Signup {...props} />} />
            <Route exact path="/" render={props => <Login {...props} />} />
            <PrivateRoute path="/my-trips" component={Trips} />
            <PrivateRoute path="/my-portfolio" component={Portfolio} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
