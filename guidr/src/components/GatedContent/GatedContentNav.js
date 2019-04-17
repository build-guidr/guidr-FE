import React from "react";
import { NavLink, Link } from "react-router-dom";

function GatedContentNav() {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="gated-content-header-container">
      <h2 className="nav-brand-name">GuidR</h2>
      <nav className="gated-content-nav">
        <NavLink to="/my-portfolio">PORTFOLIO</NavLink>
        <NavLink to="/my-trips">TRIPS</NavLink>
        <NavLink to="/add-trip">ADD TRIP</NavLink>
        <NavLink exact to="/" onClick={logout}>
          LOGOUT
        </NavLink>
      </nav>
    </div>
  );
}

export default GatedContentNav;
