import { Button, Card, CardContent } from "@material-ui/core";
import React, { Component } from "react";
import "./PostCard.css";
export default class PostCard extends Component {
  render() {
    return (
      <div style={{ marginTop: "1em" }}>
        <Card elevation={0} style={{ padding: "3px", margin: "5px" }}>
          <div className="post__hastag">#Dream11IPL</div>
          <div className="post__title">
            Mumbai Indian fixed the match against Delhi Capitals
          </div>
          <Button
            variant="primary"
            style={{ backgroundColor: "#1B5E20", color: "white" }}
          >
            Yes
          </Button>
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
        </Card>
      </div>
    );
  }
}
