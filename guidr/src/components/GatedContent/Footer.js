import React from "react";
import { NavLink, Link } from "react-router-dom";

function Footer() {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="gated-content-footer-container">
      <footer>
        <nav className="gated-content-footer-nav">
          <h2>GuidR</h2>
          <NavLink to="/my-portfolio">PORTFOLIO</NavLink>
          <NavLink to="/my-trips">TRIPS</NavLink>
          <NavLink to="/add-trip">ADD TRIP</NavLink>
          <NavLink exact to="/" onClick={logout}>
            LOGOUT
          </NavLink>
        </nav>
        <p>© 2019 GuidR, Inc. </p>
      </footer>
    </div>
  );
}

export default Footer;
