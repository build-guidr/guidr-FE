import React, { Component } from "react";
import axios from "axios";
import GatedContentNav from "./GatedContentNav";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipIcon from "./img/tooltip-icon.png";
import Footer from "./Footer";

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
    this.props.history.push("/my-trips");
  };

  render() {
    if (!this.state.trip) return <h3>Loading data...</h3>;
    console.log(this.state);
    return (
      <div className="main">
        <div className="add-trip-main-container">
          <GatedContentNav />
          <div className="trip-form-container">
            <div className="trip-form-background" />
            <h1>Add Trip</h1>
            <Form className="trip-form" onSubmit={this.onSubmitAddTrip}>
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
                  id="tripTitle"
                  onChange={this.handleChange}
                  value={this.state.trip.title}
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
                  id="tripDescription"
                  onChange={this.handleChange}
                  value={this.state.trip.description}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <div className="label-section">
                  <Label for="tripAdventureType">ADVENTURE TYPE</Label>
                  <Tooltip
                    title="What type of adveture was it? For example, hiking, kayaking, trekking, etc."
                    placement="right-start"
                  >
                    <img src={TooltipIcon} alt="tooltip icon" />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="adventure_type"
                  id="tripAdventureType"
                  onChange={this.handleChange}
                  value={this.state.trip.adventure_type}
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
                  id="tripLocation"
                  onChange={this.handleChange}
                  value={this.state.trip.location}
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
                  id="tripDuration"
                  onChange={this.handleChange}
                  value={this.state.trip.duration}
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
                  id="tripDate"
                  onChange={this.handleChange}
                  value={this.state.trip.date}
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
                  value={this.state.trip.professional}
                  onChange={this.handleChange}
                  id="tripType"
                >
                  <option value={this.state.private}>Private</option>
                  <option value={this.state.professional}>Professional</option>
                </select>
              </FormGroup>
              <Button>ADD TRIP</Button>
            </Form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddTripForm;
