import React, { Component } from "react";
import axios from "axios";
import GatedContentNav from "./GatedContentNav";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";

class AddTripForm extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      trip: {
        user_id: "",
        title: "",
        description: "",
        adventure_type: "",
        duration: "",
        location: "",
        date: "",
        professional: 1
      },
      user_id: null,
      private: 1,
      professional: 0
    };
  }

  componentDidMount() {
    const endpoint = "https://ls-guidr.herokuapp.com/api/trips";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          trips: res.data,
          user_id: res.data[0].user_id
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  addTrips = newTrip => {
    axios
      .post("https://ls-guidr.herokuapp.com/api/trips", newTrip)
      .then(res => {
        console.log("printing res");
        console.log("Trips", res.data);
        this.setState({
          trips: res.data
        });
        // redirect
        this.props.history.push("/my-trips");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      trip: {
        ...this.state.trip,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitAddTrip = e => {
    e.preventDefault();
    const { user_id } = this.state;
    const trip = {
      ...this.state.trip,
      user_id,
      professional: 1
    };
    this.addTrips(trip);

    this.setState({
      trips: [...this.state.trips, trip]
    });
  };

  render() {
    if (!this.state.trip) return <h3>Loading data...</h3>;
    console.log(this.state);
    return (
      <div className="main">
        <div className="add-trip-main-container">
          <GatedContentNav />
          <div className="trip-form-container">
            <h1>Add Trip</h1>
            <form className="trip-form" onSubmit={this.onSubmitAddTrip}>
              <FormGroup className="form-group">
                <Label for="tripTitle">TITLE</Label>
                <input
                  name="title"
                  placeholder="Title"
                  id="tripTitle"
                  onChange={this.handleChange}
                  value={this.state.trip.title}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Tooltip title="Delete" placement="left-start">
                  <Label for="tripDescription">DESCRIPTION</Label>
                </Tooltip>
                <input
                  type="text"
                  name="description"
                  id="tripDescription"
                  placeholder="Description"
                  onChange={this.handleChange}
                  value={this.state.trip.description}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="tripAdventureType">ADVENTURE TYPE</Label>
                <input
                  type="text"
                  name="adventure_type"
                  id="tripAdventureType"
                  placeholder="Adventure Type"
                  onChange={this.handleChange}
                  value={this.state.trip.adventure_type}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="tripLocation">LOCATION</Label>
                <input
                  type="text"
                  name="location"
                  id="tripLocation"
                  placeholder="Location"
                  onChange={this.handleChange}
                  value={this.state.trip.location}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="tripDuration">DURATION (ie 7 days)</Label>
                <input
                  type="text"
                  name="duration"
                  id="tripDuration"
                  placeholder="Duration"
                  onChange={this.handleChange}
                  value={this.state.trip.duration}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="tripDate">DATE (ie April 15 2019)</Label>
                <input
                  type="text"
                  name="date"
                  id="tripDate"
                  placeholder="Date"
                  onChange={this.handleChange}
                  value={this.state.trip.date}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="tripType">Trip Type</Label>
                <select
                  name="professional"
                  value={this.state.trip.professional}
                  onChange={this.handleChange}
                  id="tripType"
                >
                  <option value={this.state.private}>Private</option>
                  <option value={this.state.professional}>Professional</option>
                </select>
              </FormGroup>
              <Button>ADD TRIP</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTripForm;
