import { Avatar, Button, Card, CardContent, Grid } from "@material-ui/core";
import React, { Component } from "react";
import "./PostCard.css";
export default class PostCard extends Component {
  render() {
    return (
      <div style={{ marginTop: "1em" }}>
        <Card elevation={0} style={{ padding: "3px", margin: "5px" }}>
          <div style={{ display: "flex" }}>
            <Avatar style={{ width: "55px", height: "55px" }}>123</Avatar>
            <div style={{ paddingLeft: "6px" }}>
              Subhashis Pradhan
              <div style={{ fontSize: "14px", color: "grey" }}>
                14 hours ago
              </div>
            </div>
          </div>
          <div className="post__title">
            Mumbai Indian fixed the match against Delhi Capitals
          </div>

          <div style={{ flex: "1" }}>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              Yes / 73%
            </div>
            <div className="post__yes">93%</div>
          </div>
          <div style={{ flex: "1", paddingTop: "10px" }}>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>No / 7%</div>
            <div className="post__no"></div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Grid container>
              <Grid item xs={12}>
                <div style={{ marginBottom: "10px", fontWeight: "800" }}>
                  Is this Fake?
                </div>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="primary"
                  style={{ backgroundColor: "#1B5E20", color: "white" }}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: "#d50000",
                    color: "white",
                    marginLeft: "0.3em",
                  }}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    );
  }
}
