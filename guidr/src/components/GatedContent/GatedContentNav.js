import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

function GatedContentNav() {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location = "/";
  };

  return (
    <div className="gated-content-header-container">
      <NavLink to={`/my-trips/${localStorage.getItem("user_id")}`}>
        <h2 className="nav-brand-name">GuidR</h2>
      </NavLink>
      <nav className="gated-content-nav">
        <NavLink to="/my-portfolio">PORTFOLIO</NavLink>
        <NavLink to={`/my-trips/${localStorage.getItem("user_id")}`}>
          TRIPS
        </NavLink>
        <NavLink to="/add-trip">ADD TRIP</NavLink>
        <NavLink exact to="/" onClick={logout}>
          LOGOUT
        </NavLink>
      </nav>
    </div>
  );
}

export default GatedContentNav;