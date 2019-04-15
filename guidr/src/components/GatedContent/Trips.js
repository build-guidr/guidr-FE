import React, { Component } from "react";
import { Route } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      trips: []
    };
  }

  componentDidMount() {
    const endpoint = "/users";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ trips: res.data });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <GatedContentNav />
        </div>
        <h1>My Trips</h1>
        {/* <div>
          {this.state.trips.map(trip => (
            <p key={trip.id}>{trip.trip_name}</p>
          ))}
        </div> */}
      </div>
    );
  }
}

export default axiosWithAuth(Trips);
