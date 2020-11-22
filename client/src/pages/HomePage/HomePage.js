import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading/Loading";
import FirstTimeLogin from "../FirstTimeLogin/FirstTimeLogin";
import LoginPage from "../LoginPage/LoginPage";
import NewsFeed from "../NewsFeed/NewsFeed";
class HomePage extends Component {
  renderContent() {
    if (this.props.auth === null) {
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
          <Loading />{" "}
        </div>
      );
    } else if (this.props.auth === false) {
      return (
        <div>
          <LoginPage />
        </div>
      );
    } else if (this.props.auth.firsttimelogin === "Y") {
      return (
        <div>
          <FirstTimeLogin
            buttonDisable={true}
            disabled={false}
            navbarVisible={true}
            pagename="homepage"
          />
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
