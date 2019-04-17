import React, { Component } from "react";
import { Route } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import Footer from "./Footer";
import "./GatedContent.css";
import { Button } from "reactstrap";

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
    axios
      .get(
        `https://ls-guidr.herokuapp.com/api/trips/${this.props.match.params.id}`
      )
      .then(res => {
        const trips = res.data;
        console.log("Res", res.data);
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
    if (!this.state.trips) return <button>Add your first trip!</button>;
    return (
      <div className="main">
        <div className="trips-main-container">
          <GatedContentNav />
          <section className="content-box">
            <h1>My Trips</h1>
            <div className="tabs">
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
            <div className="trips-content-container">
              {this.state.trips.map(trip => (
                <div className="trip-content-module" key={trip.id}>
                  <h2>{trip.title}</h2>
                  <p>{trip.description}</p>
                  <Link to={`/trips/${trip.id}`}>
                    <Button size="md">Details</Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default axiosWithAuth(Trips);
