import "./App.css";
import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "./actions";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={HomePage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
