import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";

export default class Portfolio extends Component {
  render() {
    return (
      <div>
        <div>
          <GatedContentNav />
        </div>
        <h1>Portfolio</h1>
      </div>
    );
  }
}
