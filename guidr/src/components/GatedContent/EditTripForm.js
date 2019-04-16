import React, { Component } from "react";
import axios from "axios";
import GatedContentNav from "./GatedContentNav";

class EditTripForm extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      activeTrip: {},
      private: 1,
      professional: 0
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
      <div>
        <div>
          <GatedContentNav />
        </div>
        <div className="form-container">
          <h2>Edit Trip</h2>
          <form className="form" onSubmit={this.onSubmitEditedTrip}>
            <input
              name="title"
              placeholder="title"
              onChange={this.handleChange}
              value={this.state.activeTrip.title}
            />
            <input
              type="text"
              name="description"
              placeholder="trip description"
              onChange={this.handleChange}
              value={this.state.activeTrip.description}
            />
            <input
              type="text"
              name="location"
              placeholder="trip location"
              onChange={this.handleChange}
              value={this.state.activeTrip.location}
            />
            <input
              type="text"
              name="duration"
              placeholder="trip duration"
              onChange={this.handleChange}
              value={this.state.activeTrip.duration}
            />
            <input
              type="text"
              name="date"
              placeholder="trip date"
              onChange={this.handleChange}
              value={this.state.activeTrip.date}
            />
            <select
              name="professional"
              value={this.state.activeTrip.professional}
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

export default EditTripForm;
