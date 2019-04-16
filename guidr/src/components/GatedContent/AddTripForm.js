import React, { Component } from "react";
import axios from "axios";
import GatedContentNav from "./GatedContentNav";

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
      <div>
        <div>
          <GatedContentNav />
        </div>
        <div className="form-container">
          <h2>Add Trip</h2>
          <form className="form" onSubmit={this.onSubmitAddTrip}>
            <input
              name="title"
              placeholder="title"
              onChange={this.handleChange}
              value={this.state.trip.title}
            />
            <input
              type="text"
              name="description"
              placeholder="trip description"
              onChange={this.handleChange}
              value={this.state.trip.description}
            />
            <input
              type="text"
              name="adventure_type"
              placeholder="adventure type"
              onChange={this.handleChange}
              value={this.state.trip.adventure_type}
            />
            <input
              type="text"
              name="location"
              placeholder="trip location"
              onChange={this.handleChange}
              value={this.state.trip.location}
            />
            <input
              type="text"
              name="duration"
              placeholder="trip duration"
              onChange={this.handleChange}
              value={this.state.trip.duration}
            />
            <input
              type="text"
              name="date"
              placeholder="trip date"
              onChange={this.handleChange}
              value={this.state.trip.date}
            />
            <select
              name="professional"
              value={this.state.trip.professional}
              onChange={this.handleChange}
            >
              <option value={this.state.private}>Private</option>
              <option value={this.state.professional}>Professional</option>
            </select>
            <button>Update</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTripForm;
