import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./components/GatedContent/GatedContent.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

// const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
