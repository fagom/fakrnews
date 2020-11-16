import "./App.css";
import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "./actions";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PostDetails from "./pages/PostDetails/PostDetails";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
          <Route path="/post/:id" exact component={PostDetails} />
          <Route path="/profile/:id" exact component={ProfilePage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
