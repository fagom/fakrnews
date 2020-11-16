import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import * as actions from "../../actions";
import { connect } from "react-redux";
import axios from "axios";

class PostDetails extends Component {
  state = {
    posts: [],
    loading: true,
  };
  async componentDidMount() {
    let fetchuser = this.props.fetchUser;
    await fetchuser();
    if (this.props.auth === null || this.props.auth === undefined) {
      const response = await axios.post(`/api/post`, {
        _id: this.props.match.params.id,
        _user: null,
      });
      if (response.status === 200) {
        this.setState({
          posts: response.data.result,
          loading: false,
        });
      }
    } else {
      const response = await axios.post(`/api/post`, {
        _id: this.props.match.params.id,
        _user: this.props.auth._id,
      });
      if (response.status === 200) {
        this.setState({
          posts: response.data.result,
          loading: false,
        });
      }
    }
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
    console.log("postdetails", this.state.posts);
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
export default connect(mapStateToProps, actions)(PostDetails);
