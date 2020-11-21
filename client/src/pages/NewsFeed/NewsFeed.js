import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import * as actions from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

class NewsFeed extends Component {
  state = {
    posts: [],
    limit: 48,
    page: 1,
    loading: true,
  };
  fetchData = async () => {
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
  };
  componentDidMount() {
    this.fetchData();
  }

  refreshScreen = () => {
    this.setState({ limit: 50, page: 1, loading: true });
    this.fetchData();
  };

  deletePost = async (id) => {
    let newposts = this.state.posts.filter((item, i) => item._id != id);
    console.log(id, newposts);
    const response = await axios.post("/api/post/delete", { _id: id });
    if (response.status === 200) {
      this.setState({ posts: newposts });
    }
  };

  render() {
    console.log("newsfeed", this.state.posts);
    if (this.state.loading) {
      return (
        <div>
          <NavBar auth={this.props.auth} />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Grid container>
            <Grid item xs={12} md={4}>
              <SideNavBar
                auth={this.props.auth}
                refreshScreen={this.refreshScreen}
              />
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
        <NavBar auth={this.props.auth} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <Grid container>
            <Grid item xs={12} md={3} lg={2}>
              <SideNavBar
                auth={this.props.auth}
                refreshScreen={this.refreshScreen}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container>
                <Grid item xs={12} md={4} lg={4}>
                  {this.state.posts.map((post, index) => {
                    if (index % 3 === 0) {
                      return (
                        <PostCard
                          key={post._id}
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
                          username={post.username}
                          _user={post._user}
                          deletePost={() => this.deletePost(post._id)}
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
                          key={post._id}
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
                          username={post.username}
                          _user={post._user}
                          deletePost={() => this.deletePost(post._id)}
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
                          key={post._id}
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
                          username={post.username}
                          _user={post._user}
                          deletePost={() => this.deletePost(post._id)}
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
export default connect(mapStateToProps)(NewsFeed);
