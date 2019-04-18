import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  withRouter
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import axios from "axios";

import "./App.css";
import PublicContentNav from "./components/PublicContent/PublicContentNav";
import GatedContentNav from "./components/GatedContent/GatedContentNav";
import Trips from "./components/GatedContent/Trips";
import Trip from "./components/GatedContent/Trip";
import Login from "./components/PublicContent/Login";
import Signup from "./components/PublicContent/Signup";
import Portfolio from "./components/GatedContent/Portfolio";
import EditTripForm from "./components/GatedContent/EditTripForm";
import AddTripForm from "./components/GatedContent/AddTripForm";

axios.defaults.baseURL =
  process.env.API_URL || "https://ls-guidr.herokuapp.com/api/";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/signup" render={props => <Signup {...props} />} />
          <Route exact path="/" render={props => <Login {...props} />} />
          <PrivateRoute path="/my-trips" component={Trips} />
          <PrivateRoute path="/my-portfolio" component={Portfolio} />
          <PrivateRoute path="/edit-trip/:id" component={EditTripForm} />
          <PrivateRoute path="/add-trip" component={AddTripForm} />
          <PrivateRoute path="/trips/:id" component={Trip} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
