import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import * as actions from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Moment from "react-moment";
import moment from "moment";

class ProfilePage extends Component {
  state = {
    posts: [],
    limit: 50,
    page: 1,
    loading: true,
  };
  async componentDidMount() {
    const response = await axios.post("/api/post/feed", {
      _user: this.props.auth._id,
      limit: this.state.limit,
      page: this.state.page,
    });
    console.log(response.data);
    this.setState({
      posts: response.data.result,
      page: response.data.nextPage.page,
      loading: false,
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          <NavBar />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Grid container>
            <Grid item xs={12} md={4}>
              <SideNavBar auth={this.props.auth} />
            </Grid>
            <Grid item xs={12} md={4}>
              <h5>Loading....</h5>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <NavBar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <Grid container>
            <Grid item xs={12} md={3} lg={2}>
              <SideNavBar auth={this.props.auth} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container>
                <Grid item xs={12}>
                  <div style={{ display: "flex" }}>
                    <Avatar
                      style={{
                        width: "55px",
                        height: "55px",
                        backgroundColor: this.state.userIconColor,
                      }}
                    >
                      {this.props.auth.firstname[0] +
                        this.props.auth.surname[0]}
                    </Avatar>
                    <div style={{ paddingLeft: "6px", fontWeight: "900" }}>
                      {this.props.auth.fullname}
                      <div
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          fontWeight: "normal",
                        }}
                      >
                        @fagom2-38
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  {this.state.posts.map((post, index) => {
                    if (index % 3 === 0) {
                      return (
                        <PostCard
                          key={index}
                          fullname={post.fullname}
                          firstname={post.firstname}
                          surname={post.surname}
                          userIconColor={post.userIconColor}
                          createddate={post.postmodifeddate}
                          posttitle={post.posttitle}
                          totalvotes={post.totalvotes}
                          votecount={post.votecount}
                          uservotedvalue={post.uservotedvalue}
                          curruser={this.props.auth}
                          _post={post._id}
                        />
                      );
                    }
                    return null;
                  })}
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  {this.state.posts.map((post, index) => {
                    if (index % 3 === 1) {
                      return (
                        <PostCard
                          key={index}
                          fullname={post.fullname}
                          firstname={post.firstname}
                          surname={post.surname}
                          userIconColor={post.userIconColor}
                          createddate={post.postmodifeddate}
                          posttitle={post.posttitle}
                          totalvotes={post.totalvotes}
                          votecount={post.votecount}
                          uservotedvalue={post.uservotedvalue}
                          curruser={this.props.auth}
                          _post={post._id}
                        />
                      );
                    }
                    return null;
                  })}
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  {this.state.posts.map((post, index) => {
                    if (index % 3 === 2) {
                      return (
                        <PostCard
                          key={index}
                          fullname={post.fullname}
                          firstname={post.firstname}
                          surname={post.surname}
                          userIconColor={post.userIconColor}
                          createddate={post.postmodifeddate}
                          posttitle={post.posttitle}
                          totalvotes={post.totalvotes}
                          votecount={post.votecount}
                          uservotedvalue={post.uservotedvalue}
                          curruser={this.props.auth}
                          _post={post._id}
                        />
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={2}></Grid> */}
          </Grid>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(ProfilePage);
