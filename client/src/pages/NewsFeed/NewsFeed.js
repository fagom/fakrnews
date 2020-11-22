import { Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import * as actions from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

class NewsFeed extends Component {
  state = {
    posts: [],
    limit: 48,
    page: 1,
    loading: true,
    moreLoading: true,
  };
  fetchData = async () => {
    const response = await axios.post("/api/post/feed", {
      _user: this.props.auth._id,
      limit: this.state.limit,
      page: this.state.page,
    });
    console.log(response.data);
    if (response.data.result.length > 0) {
      this.setState((prevstate) => {
        return {
          posts: [...prevstate.posts, ...response.data.result],
          page: response.data.nextPage.page,
          loading: false,
          moreLoading:
            response.data.result.length < this.state.limit ? false : true,
        };
      });
    } else {
      this.setState({
        moreLoading: false,
      });
    }
  };

  // handleScroll = () => {
  //   var lastLi = document.querySelector("div.MuiPaper-root > div:last-child");
  //   console.log("lastLi", lastLi);
  //   var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
  //   var pageOffset = window.pageYOffset + window.innerHeight;
  //   if (pageOffset > lastLiOffset) {
  //     this.fetchData();
  //   }
  // };

  componentDidMount() {
    this.fetchData();
    // this.scrollListener = window.addEventListener("scroll", (e) => {
    //   this.handleScroll(e);
    // });
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
          <div>
            <Grid container>
              <Grid item xs={12} md={4} lg={2}>
                <SideNavBar
                  auth={this.props.auth}
                  refreshScreen={this.refreshScreen}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Loading />
                </div>
              </Grid>
              <Grid item xs={12} md={4}></Grid>
            </Grid>
          </div>
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
              {this.state.moreLoading === true ? (
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      style={{
                        fontSize: "12px",
                        background:
                          "linear-gradient(45deg, #e76f51 30%, #f4a261 90%)",
                        color: "white",
                        fontWeight: "500",
                      }}
                      onClick={this.fetchData}
                    >
                      Load More
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
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
