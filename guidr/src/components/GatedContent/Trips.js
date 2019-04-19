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
    AOS.init();
    if (!this.state.length)
      return (
        <div className="main">
          <div className="trips-main-container">
            <GatedContentNav />
            <section
              className="content-box"
              data-aos="fade-in"
              // data-aos-anchor-placement="top-center"
              // data-aos-duration="900"
            >
              <h1>My Trips</h1>
              <div className="trips-content-container">
                <div className="get-started-content">
                  <div className="get-started-sub-container">
                    <div className="get-started-background" />
                    <div className="get-started-sub-container-content">
                      <p>Welcome to GuidR! </p>
                      <ul>
                        <div className="get-started-choices">
                          <li>
                            Add your first trip to your GuidR account to get
                            started
                          </li>
                          <Button size="lg">
                            <Link to="/add-trip">ADD YOUR FIRST TRIP</Link>
                          </Button>
                        </div>
                        {/* <div className="get-started-choices">
                          <li>
                            Start building your profile to showcase you killer
                            skills!
                          </li>
                          <Button size="lg">
                            <Link to="/my-portfolio">BUILD YOUR PORTFOLIO</Link>
                          </Button>
                        </div> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      );
    return (
      <div className="main">
        <div className="trips-main-container">
          <GatedContentNav />
          <section
            className="content-box"
            data-aos="fade-in"
            data-aos-duration="900"
          >
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
                  <p>
                    Trip Type:
                    {` ${
                      trip.professional === true ? "Professional" : "Private"
                    }`}
                  </p>
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
