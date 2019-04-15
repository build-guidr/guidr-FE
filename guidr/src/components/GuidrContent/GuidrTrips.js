import React, { Component } from "react";
import { Route } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import { Link } from "react-router-dom";

export default class GuidrTrips extends Component {
  constructor() {
    super();
    this.state = {
      guidr: []
    };
  }

  componentDidMount() {
    axiosWithAuth()
      .get("http://localhost:5000/api/data")
      .then(res => {
        this.setState({ guidr: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>My Trips</h2>
        <div>
          {this.state.guidr.map(item => (
            <p key={item.id}>{item.trip_name}</p>
          ))}
        </div>
      </div>
    );
  }
}
