import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class GatedContentNav extends Component {
  logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  render() {
    return (
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/my-trips">My Trips</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/my-portfolio">My Portfolio</NavLink>
          &nbsp;|&nbsp;
          {/* <NavLink to="/add-portfolio">Add Portfolio</NavLink>
          &nbsp;|&nbsp; */}
          <NavLink to="/update-portfolio">Update Portfolio</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.logout}>Logout</button>
        </nav>
      </div>
    );
  }
}
