import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./PublicContent.css";

function PublicContentNav() {
  return (
    <div className="public-content-header-container">
      <nav className="public-content-nav">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/signup">
          Create an Account
        </NavLink>
        <NavLink className="nav-link" to="/">
          Login
        </NavLink>
      </nav>
      <header className="public-content-header-text">
        <h1>Guidr</h1>
        <h3>Your personalized outdoor outfitter portfolio</h3>
      </header>
    </div>
  );
}

export default PublicContentNav;
