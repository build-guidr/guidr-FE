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
    console.log(this);
  }

  componentDidMount() {
    const endpoint = "https://ls-guidr.herokuapp.com/api/trips";
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
        <div>
          {this.state.trips.map(trip => (
            <div key={trip.id}>
              <p>{trip.title}</p>
              <p>{trip.description}</p>
              <Link to={`/trips/${trip.id}`}>
                <p>Details</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default axiosWithAuth(Trips);
