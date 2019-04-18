import React, { Component } from "react";
import axios from "axios";
import GatedContentNav from "./GatedContentNav";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipIcon from "./img/tooltip-icon.png";
import { NavLink, Link } from "react-router-dom";
import Footer from "./Footer";

class EditTripForm extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      activeTrip: {},
      professional: true
    };
  }

  componentDidMount() {
    const endpoint = "https://ls-guidr.herokuapp.com/api/trips";
    axios
      .get(endpoint)
      .then(res => {
        const trips = res.data;
        this.setState({
          trips,
          activeTrip: trips.find(t => `${t.id}` === this.props.match.params.id)
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  updateTrip = updatedTrip => {
    console.log(updatedTrip);
    axios
      .put(
        `https://ls-guidr.herokuapp.com/api/trips/${updatedTrip.id}`,
        updatedTrip
      )
      .then(res => {
        const trips = res.data;
        this.setState({
          trips
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/trips/${updatedTrip.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      activeTrip: {
        ...this.state.activeTrip,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitEditedTrip = e => {
    e.preventDefault();
    this.updateTrip(this.state.activeTrip);
  };

  render() {
    if (!this.state.activeTrip) return <h3>Loading data...</h3>;
    return (
      <div className="main">
        <div className="add-trip-main-container">
          <GatedContentNav />
          <div className="trip-form-container">
            <div className="trip-form-background" />
            <h1>Edit Trip</h1>
            <Form className="trip-form" onSubmit={this.onSubmitEditedTrip}>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripTitle">TITLE</Label>
                  <Tooltip
                    title="The name of your trip"
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <input
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.activeTrip.title}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripDescription">DESCRIPTION</Label>
                  <Tooltip
                    title="Description of your trip and location highlights"
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.activeTrip.description}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripLocation">LOCATION</Label>
                  <Tooltip
                    title="Where this trip was located"
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="location"
                  onChange={this.handleChange}
                  value={this.state.activeTrip.location}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripDuration">DURATION</Label>
                  <Tooltip
                    title="The duration of the trip (ie 7 days)"
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="duration"
                  onChange={this.handleChange}
                  value={this.state.activeTrip.duration}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripDate">DATE</Label>
                  <Tooltip
                    title="The date of the trip (ie April 15 2019"
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="date"
                  onChange={this.handleChange}
                  value={this.state.activeTrip.date}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripType">TRIP TYPE</Label>
                  <Tooltip
                    title="Choose between a professional trip or something you enjoyed in your own time."
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <select
                  name="professional"
                  value={this.state.activeTrip.professional}
                  onChange={this.handleChange}
                >
                  <option value={!this.state.professional}>Private</option>
                  <option value={this.state.professional}>Professional</option>
                </select>
              </FormGroup>
              <button>EDIT TRIP</button>
            </Form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default EditTripForm;
