import React, { Component } from "react";
import { Route } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import Footer from "./Footer";
import "./GatedContent.css";
import { Button } from "reactstrap";
import AOS from "aos";
import "aos/dist/aos.css";

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
        filter: { professional: false }
      },
      {
        key: "professional",
        label: "Professional",
        filter: { professional: true }
      }
    ];
    console.log(this);
  }

  componentDidMount() {
    axios
      .get("https://ls-guidr.herokuapp.com/api/trips/")
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
    AOS.init();
    if (!this.state.trips) return <button>Add your first trip!</button>;
    return (
      <div className="main">
        <div className="trips-main-container">
          <GatedContentNav />
          <section className="content-box" data-aos="fade-in">
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
                <div
                  className="trip-content-module"
                  key={trip.id}
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-duration="900"
                >
                  <h2>{trip.title}</h2>
                  <p>{trip.description}</p>
                  <Link to={`/trips/${trip.id}`}>
                    <Button size="md">DETAILS</Button>
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
