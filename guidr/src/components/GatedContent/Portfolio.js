import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import GatedContentNav from "./GatedContentNav";
import axios from 'axios'

export default class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  // create
  componentDidMount() {
    axios 
    .get('https://ls-guidr.herokuapp.com/api/profile')
    .then(result => { console.log(result.data)
      this.setState({ user: result.data });
    })
    .catch(error => console.log(`unable to load Data`));
}

  // delete
  deleteUser = id => {
    axios
      .delete(`https://ls-guidr.herokuapp.com/api/users${id}`)
      .then(result => 
          this.setState({
            user: result.data
          })
        )
      .catch(error => console.log(error))
  }
  
  render() {
    return (
      <div>
        <div>
          <GatedContentNav />
        </div>
        <h1>Portfolio</h1>
        <div>
          {this.state.user.map(user => (
            <div key={user.id}>
              <p> <strong>Guidr:</strong> {user.first_name} {user.last_name}</p>
              <p> <strong>Age:</strong> {user.years_of_exp}</p>
              <p> <strong>About:</strong> {user.profile_text}</p>
              <p> <strong>Certification:</strong> {user.certs}</p>
              <Link to={`/portfolio/${user.id}`}>
                <p>Details</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

