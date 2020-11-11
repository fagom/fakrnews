import "./App.css";

import React, { Component } from "react";
import NewsFeed from "./pages/NewsFeed/NewsFeed";

class App extends Component {
  render() {
    return (
      <div>
        <NewsFeed />
      </div>
    );
  }
}

export default App;
