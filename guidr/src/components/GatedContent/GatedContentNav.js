import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

function GatedContentNav() {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/my-trips">My Trips</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/my-portfolio">My Portfolio</NavLink>
        &nbsp;|&nbsp;
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}

export default GatedContentNav;
