import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import NewsFeed from "../NewsFeed/NewsFeed";
class HomePage extends Component {
  renderContent() {
    if (this.props.auth === null) {
      return <div>Please wait....Loading Content</div>;
    } else if (this.props.auth === false) {
      return (
        <div>
          <LoginPage />
        </div>
      );
    }
    return (
      <div>
        <NewsFeed />
      </div>
    );
  }
  render() {
    console.log("homepage", this.props.auth);
    return <div>{this.renderContent()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(HomePage);
