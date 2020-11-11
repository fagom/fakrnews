import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostCard from "../../components/PostCard/PostCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

class NewsFeed extends Component {
  render() {
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
              <SideNavBar />
            </Grid>
            <Grid item xs={12} md={4}>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default NewsFeed;
