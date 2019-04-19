import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./PublicContent.css";
import GuidrLogo from "./img/guidr-logo.png";
import FacebookIcon from "./img/facebook-icon.png";
import TwitterIcon from "./img/twitter-icon.png";
import LinkedInIcon from "./img/linkedin-icon.png";

function PublicContentNav() {
  return (
    <div className="public-content-header-container">
      <nav className="public-content-nav">
        <NavLink className="nav-link" to="/">
          <img src={GuidrLogo} className="logo" alt="Guidr Logo" />
        </NavLink>
        {/* <NavLink
          className="nav-link"
          activeClassName="nav-link-active"
          exact
          to="/"
        >
          LOGIN
        </NavLink>
        <NavLink
          className="nav-link"
          activeClassName="nav-link-active"
          to="/signup"
        >
          CREATE ACCOUNT
        </NavLink> */}
      </nav>
      <header className="public-content-header-text">
        <h1>GuidR</h1>
        {/* <h1>
          <img src={GuidrLogo} alt="Guidr Logo" />
        </h1> */}
        <h3>Your personalized outdoor outfitter portfolio</h3>
      </header>
      <div className="social-icons">
        <img src={FacebookIcon} alt="facebook-icon" />
        <img src={TwitterIcon} className="twitter" alt="twitter-icon" />
        <img src={LinkedInIcon} alt="linkedin-icon" />
      </div>
    </div>
  );
}

export default PublicContentNav;
