import React, { Component } from "react";
import { Route } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import "./GatedContent.css";

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      allTrips: [],
      trips: [],
      filter: {}
    };
    this.tabs = [
      {
        key: "all",
        label: "All",
        filter: {}
      },
      {
        key: "private",
        label: "Private",
        filter: { professional: 1 }
      },
      {
        key: "professional",
        label: "Professional",
        filter: { professional: 0 }
      }
    ];
    console.log(this);
  }

  componentDidMount() {
    const endpoint = "https://ls-guidr.herokuapp.com/api/trips";
    axios
      .get(endpoint)
      .then(res => {
        const trips = res.data;
        this.setState({
          allTrips: trips,
          trips
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  getFilteredTrips = filter => {
    return this.state.allTrips.filter(trip => {
      return JSON.stringify({ ...trip, ...filter }) === JSON.stringify(trip);
    });
  };

  updateFilter = (e, { key, filter }) => {
    const filteredTrips = this.getFilteredTrips(filter);
    this.setState({
      trips: filteredTrips,
      activeTab: key
    });
    console.log(filteredTrips);
  };

  render() {
    return (
      <div>
        <div>
          <GatedContentNav />
        </div>
        <h1>My Trips</h1>
        <div>
          {this.tabs.map(tab => {
            return (
              <button
                key={tab.key}
                className={`tab${
                  this.state.activeTab === tab.key ? " active-tab" : ""
                }`}
                onClick={e => this.updateFilter(e, tab)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
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
