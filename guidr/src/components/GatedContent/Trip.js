import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import Footer from "./Footer";
import "./GatedContent.css";
import Edit from "./img/edit-icon.png";
import Delete from "./img/delete-icon.png";
import { Button } from "reactstrap";
import AOS from "aos";
import "aos/dist/aos.css";

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
    const endpoint = "https://ls-guidr.herokuapp.com/api/trips/";
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

  deleteTrips = id => {
    return axios
      .delete(`https://ls-guidr.herokuapp.com/api/trips/${id}`)
      .then(res => {
        const trips = res.data;
        this.setState({ trips });

        this.props.history.push(`/my-trips/${this.state.trip.user_id}`);
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
    AOS.init();
    // console.log("All mah trips: ", this.state.trips);
    if (!this.state.trip) return <h3>Loading data...</h3>;

    console.log(this.state.trip);
    return (
      <div className="main">
        <div className="trip-main-container">
          <GatedContentNav />
          <div className="trip-card" data-aos="fade-in">
            <div className="trip-content-container">
              <div className="title-ctas">
                <h1>{this.state.trip.title}</h1>
                <div onClick={this.updateTrip} className="edit-icon-container">
                  <img src={Edit} alt="edit icon" /> <p> Edit Trip</p>
                </div>
                <div
                  onClick={this.deleteTrip}
                  className="delete-icon-container"
                >
                  <img src={Delete} alt="edit icon" />
                  <p> Delete Trip</p>
                </div>
              </div>
              <div>
                <div className="trip-details">
                  <div className="mini-details">
                    <p>Date Embarked: {this.state.trip.date}</p>
                    <p>Duration: {this.state.trip.duration}</p>
                    <p>Location: {this.state.trip.location}</p>
                  </div>
                  <p>{this.state.trip.description}</p>
                  <p>
                    Trip Type:
                    {` ${
                      this.state.trip.professional === true
                        ? "Professional"
                        : "Private"
                    }`}
                  </p>
                </div>
              </div>
              <Link to={`/my-trips/${localStorage.getItem("user_id")}`}>
                <Button className="back-cta" variant="secondary" size="lg">
                  BACK TO MY TRIPS
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
