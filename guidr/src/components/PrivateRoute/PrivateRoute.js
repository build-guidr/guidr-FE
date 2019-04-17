import React from "react";
import { Route, Redirect } from "react-router-dom";

//Requirements:
// 1. This component has to have the same API as the react router route component (< Route />)
// 2. This component has to render a route component from react router and pass all of the props through to it.
// 3. It has to check for a token (JWT) if the user is authenticated, then render the component. Otherwise, the user will be redirected to the login page (/login)
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          // redirect to login
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
