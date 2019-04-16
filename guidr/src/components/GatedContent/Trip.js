import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";

export default class Trip extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      activeTrip: {},
      trip: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://ls-guidr.herokuapp.com/api/trips";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          trips: res.data,
          trip: res.data.find(
            trip => `${trip.id}` === this.props.match.params.id
          )
        });
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

  deleteTrips = id => {
    return axios
      .delete(`https://ls-guidr.herokuapp.com/api/trips/${id}`)
      .then(res => {
        const trips = res.data;
        this.setState({ trips });
        this.props.history.push("/my-trips");
        // console.log(res);
        // redirect
      })
      .catch(err => {
        console.log(err);
      });
  };

  setActiveTrip = trip => {
    this.setState({ activeTrip: trip });
  };

  updateTrip = e => {
    e.preventDefault();
    this.setActiveTrip(this.state.trip);
    this.props.history.push(`/edit-trip/${this.state.trip.id}`);
  };

  deleteTrip = e => {
    e.preventDefault();
    this.deleteTrips(this.state.trip.id);
  };

  render() {
    // console.log("All mah trips: ", this.state.trips);
    if (!this.state.trip) return <h3>Loading data...</h3>;

    console.log(this.state.trip);
    return (
      <div>
        <div>
          <GatedContentNav />
        </div>
        <h1>{this.state.trip.title}</h1>
        <div>
          <p>{this.state.trip.description}</p>
          <p>
            Trip Type:{" "}
            {`${
              this.state.trip.professional === 1 ? "Private" : "Professional"
            }`}
          </p>
          <p>{this.state.trip.date}</p>
          <p>{this.state.trip.duration}</p>
          <p>{this.state.trip.location}</p>
          <button onClick={this.updateTrip}>Update Trip</button>
          <button onClick={this.deleteTrip}>Delete Trip</button>
        </div>
      </div>
    );
  }
}
