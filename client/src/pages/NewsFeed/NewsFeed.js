import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import * as actions from "../../actions";
import { connect } from "react-redux";
import axios from "axios";

class NewsFeed extends Component {
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
            <Grid item xs={12} md={4}>
              <SideNavBar auth={this.props.auth} />
            </Grid>
            <Grid item xs={12} md={4}>
              {this.state.posts.map((post, index) => {
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
              })}
            </Grid>
            <Grid item xs={12} md={4}></Grid>
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
export default connect(mapStateToProps)(NewsFeed);
