import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";

export default class Trip extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      activeTrip: {}
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

  updateTrip = updatedTrip => {
    axios
      .put(
        `https://ls-guidr.herokuapp.com/api/trips/${updatedTrip.id}`,
        updatedTrip
      )
      .then(res => {
        this.setState({ trips: res.data });
        console.log(res);
        // redirect
        this.props.history.push(`/trips/${updatedTrip.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("All mah trips: ", this.state.trips);
    this.trip = this.state.trips.find(
      trip => `${trip.id}` === this.props.match.params.id
    );
    if (!this.trip) return <h3>Loading data...</h3>;

    console.log(this.trip);
    this.setActiveTrip = trip => {
      this.setState({ activeTrip: trip });
    };

    this.updateTrip = e => {
      e.preventDefault();
      this.setActiveTrip(this.trip);
      this.props.history.push(`/edit-trip/${this.trip.id}`);
    };
    return (
      <div>
        <div>
          <GatedContentNav />
        </div>
        <h1>{this.trip.title}</h1>
        <div>
          <p>{this.trip.description}</p>
          <p>{this.trip.date}</p>
          <p>{this.trip.duration}</p>
          <p>{this.trip.location}</p>
          <button onClick={this.updateTrip}>Update Trip</button>
        </div>
      </div>
    );
  }
}
