import React from "react";
import { NavLink, Link } from "react-router-dom";
import FacebookIconLight from "./img/facebook-light.png";
import TwitterIconLight from "./img/twitter-icon-light.png";
import LinkedInIconLight from "./img/linkedin-light.png";

function Footer() {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="gated-content-footer-container">
      <footer>
        <div className="nav-social">
          <nav className="gated-content-footer-nav">
            <h2>GuidR</h2>
            <NavLink to="/my-portfolio">PORTFOLIO</NavLink>
            <NavLink to={`/my-trips/${localStorage.getItem("user_id")}`}>
              TRIPS
            </NavLink>
            <NavLink to="/add-trip">ADD TRIP</NavLink>
            <NavLink exact to="/" onClick={logout}>
              LOGOUT
            </NavLink>
          </nav>
          <div className="gated-social-icons">
            <img src={FacebookIconLight} alt="facebook-icon" />
            <img src={TwitterIconLight} alt="twitter-icon" />
            <img src={LinkedInIconLight} alt="linkedin-icon" />
          </div>
        </div>

        <p>© 2019 GuidR, Inc. </p>
      </footer>
    </div>
  );
}

export default Footer;
