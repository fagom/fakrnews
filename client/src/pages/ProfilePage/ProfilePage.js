import { Button, Grid, Avatar, Container, TextField } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FirstTimeLogin from "../FirstTimeLogin/FirstTimeLogin";

import { connect } from "react-redux";
import axios from "axios";

class ProfilePage extends Component {
  COLORS = ["#007ee5", "#bd081c", "#ff6600", "#131418", "#410093"];
  state = {
    posts: [],
    limit: 50,
    page: 1,
    loading: true,
    firstname: "",
    surname: "",
    fullname: "",
    username: "",
    _id: "",
    userIconColor: "",
    editprofile: false,
    colorIndex: 0,
    buttonDisable: false,
    userbio: "",
    usernameHelperText: "Username must be between 6 and 30 characters.",
  };
  componentDidMount() {
    // this.setState({
    //   fistname: this.props.auth.firstname,
    //   surname: this.props.auth.surname,
    //   colorIndex: 0,
    //   userIconColor: this.COLORS[0],
    // });
    this.fetchData();
  }

  fetchData = async () => {
    //this.setState({ editprofile: false });
    const userresp = await axios.get(`/api/user/${this.props.id}`);

    if (userresp.status === 200) {
      this.setState({
        firstname: userresp.data.firstname,
        surname: userresp.data.surname,
        fullname: userresp.data.firstname + " " + userresp.data.surname,
        username: userresp.data.username,
        _id: userresp.data._id,
        userbio: userresp.data.userbio,
        userIconColor: userresp.data.userIconColor,
        editprofile: false,
        limit: 50,
        page: 1,
      });
    }

    const response = await axios.post("/api/user/posts", {
      _user: this.state._id,
      limit: this.state.limit,
      page: this.state.page,
    });

    this.setState({
      posts: response.data.result,
      page: response.data.nextPage.page,
      loading: false,
    });
  };

  handleClose = () => {
    this.setState({ editprofile: false });
  };

  refreshScreen = () => {
    this.setState({ limit: 50, page: 1, loading: true });
    this.fetchData();
  };

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
        <NavBar />
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
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      float: "center",
                    }}
                  >
                    <Avatar
                      style={{
                        width: "80px",
                        height: "80px",
                        // backgroundColor: this.state.userIconColor,
                        background: `linear-gradient(45deg, ${this.state.userIconColor} 30%, #f4a261 90%)`,
                      }}
                    >
                      {this.state.firstname[0] + this.state.surname[0]}
                    </Avatar>
                    <div style={{ paddingLeft: "6px", fontWeight: "900" }}>
                      {this.state.fullname}
                      <div
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          fontWeight: "normal",
                        }}
                      >
                        @{this.state.username}
                      </div>
                      <div style={{ paddingLeft: "6px", fontWeight: "200" }}>
                        {this.state.userbio}
                      </div>
                      {this.state.username === this.props.auth.username ? (
                        <div>
                          <Button
                            variant="contained"
                            style={{
                              color: "white",
                              fontSize: "10px",
                              borderRadius: "20px",
                              marginTop: "5px",
                              backgroundColor: "#007ee5",
                            }}
                            onClick={() => this.setState({ editprofile: true })}
                          >
                            Edit Profile
                          </Button>
                          <Dialog
                            maxWidth={"xs"}
                            fullWidth={false}
                            open={this.state.editprofile}
                            //TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogContent>
                              <FirstTimeLogin
                                buttonDisable={false}
                                disabled={true}
                                navbarVisible={false}
                                pagename="profile"
                                successEdit={this.fetchData}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <h3>Activity</h3>
                </Grid>
                <Grid item xs={12}>
                  {this.state.posts.length === 0 ? "No Posts yet." : ""}
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
                          username={post.username}
                          _user={post._user}
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
                          username={post.username}
                          _user={post._user}
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
                          username={post.username}
                          _user={post._user}
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
