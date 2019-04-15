import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

function PublicContentNav() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/signup">SignUp</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/">Login</NavLink>
        &nbsp;|&nbsp;
      </nav>
      <header>
        <h1>Guidr</h1>
        <h3>Your personalized outdoor outfitter portfolio</h3>
      </header>
    </div>
  );
}

export default PublicContentNav;
