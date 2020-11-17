import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@material-ui/core";
import React, { Component } from "react";
import "./PostCard.css";
import Moment from "react-moment";
import moment from "moment";
import Linkify from "react-linkify";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
class PostCard extends Component {
  MAX_WIDTH = window.innerWidth > 760 ? 250 : 100;

  state = {
    createddate: null,
    voted: false,
    fullname: "",
    firstname: "",
    surname: "",
    userIconColor: "",
    createddate: "",
    posttitle: "",
    totalvotes: 0,
    votecount: [],
    uservotedvalue: null,
    popoveropen: false,
    username: "",
  };
  componentDidMount() {
    moment.updateLocale("en", null);
    this.setState({
      createddate: moment(new Date(this.props.createddate)).format("MM/DD/YY"),
      fullname: this.props.fullname,
      createddate: this.props.createddate,
      posttitle: this.props.posttitle,
      totalvotes: this.props.totalvotes,
      votecount: this.props.votecount,
      voted: this.props.uservotedvalue === null ? false : true,
      firstname: this.props.firstname,
      surname: this.props.surname,
      userIconColor: this.props.userIconColor,
      uservotedvalue: this.props.uservotedvalue,
      username: this.props.username,
    });
  }

  votePost = async (value) => {
    console.log("post", this.props.curruser, this.state);
    if (this.props.curruser === null || this.props.curruser === false) {
      this.props.history.push("/");
    }
    if (this.state.voted) {
      const response = await axios.post("/api/vote/update", {
        _post: this.props._post,
        _user: this.props.curruser._id,
        votevalue: value,
      });
      let currvotecount = this.state.votecount;
      let currtotalvotes = this.state.totalvotes;
      if (response.status === 200) {
        if (value === 1 && value !== this.state.uservotedvalue) {
          currvotecount[0] -= 1;
          currvotecount[value] += 1;
        } else if (value === 0 && value !== this.state.uservotedvalue) {
          currvotecount[1] -= 1;
          currvotecount[value] += 1;
        }

        this.setState({
          voted: true,
          uservotedvalue: response.data.votevalue,
          votecount: currvotecount,
          totalvotes: currtotalvotes,
        });
      }
    } else {
      const response = await axios.post("/api/vote/create", {
        _post: this.props._post,
        _user: this.props.curruser._id,
        votevalue: value,
      });
      let currvotecount = this.state.votecount;
      let currtotalvotes = this.state.totalvotes;
      if (response.status === 200) {
        currvotecount[value] += 1;
        currtotalvotes += 1;
        this.setState({
          voted: true,
          uservotedvalue: response.data.votevalue,
          votecount: currvotecount,
          totalvotes: currtotalvotes,
        });
      }
    }

    //console.log(response);
  };

  render() {
    return (
      <div style={{ marginTop: "1em", padding: "10px" }}>
        <Card elevation={5}>
          <CardContent onClick={() => this.setState({ popoveropen: true })}>
            <Link to={`/profile/${this.state.username}`}>
              <div style={{ display: "flex" }}>
                <Avatar
                  style={{
                    width: "55px",
                    height: "55px",
                    backgroundColor: this.state.userIconColor,
                  }}
                >
                  {this.state.firstname[0] + this.state.surname[0]}
                </Avatar>
                <div
                  style={{
                    paddingLeft: "6px",
                    fontWeight: "900",
                    color: "black",
                  }}
                >
                  {this.state.fullname}
                  <div
                    style={{
                      fontSize: "14px",
                      color: "grey",
                      fontWeight: "normal",
                    }}
                  >
                    <Moment fromNow>{this.state.createddate}</Moment>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
          <CardContent style={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <div className="post__title">
              <Linkify>{this.state.posttitle}</Linkify>
            </div>
          </CardContent>

          <CardContent>
            <div style={{ flex: "1" }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: this.state.uservotedvalue === 1 ? "green" : "black",
                }}
              >
                Yes /{" "}
                {this.state.votecount[1] === 0
                  ? 0
                  : (
                      (this.state.votecount[1] * 100) /
                      this.state.totalvotes
                    ).toFixed(1)}
                %
              </div>
              <div
                className="post__yes"
                style={{
                  width:
                    this.state.votecount[1] === 0
                      ? "1px"
                      : (
                          (this.state.votecount[1] * this.MAX_WIDTH) /
                          this.state.totalvotes
                        ).toFixed(2) + "px",
                }}
              ></div>
            </div>
            <div style={{ flex: "1", paddingTop: "10px" }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: this.state.uservotedvalue === 0 ? "green" : "black",
                }}
              >
                No /{" "}
                {this.state.votecount[0] === 0
                  ? 0
                  : (
                      (this.state.votecount[0] * 100) /
                      this.state.totalvotes
                    ).toFixed(1)}
                %
              </div>
              <div
                className="post__no"
                style={{
                  width:
                    this.state.votecount[0] === 0
                      ? "1px"
                      : (
                          (this.state.votecount[0] * this.MAX_WIDTH) /
                          this.state.totalvotes
                        ).toFixed(2) + "px",
                }}
              ></div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Grid container>
                <Grid item xs={12}>
                  <div style={{ marginBottom: "10px", fontWeight: "800" }}>
                    Is this Fake?
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    variant="outlined"
                    style={{
                      //backgroundColor: "#007ee5",
                      color:
                        this.state.uservotedvalue === 1 ? "green" : "#007ee5",
                      borderRadius: "20px",
                      fontWeight: "800",
                    }}
                    onClick={() => this.votePost(1)}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={3}>
                  <IconButton
                    variant="outlined"
                    style={{
                      //backgroundColor: "#007ee5",
                      color:
                        this.state.uservotedvalue === 0 ? "green" : "#007ee5",
                      borderRadius: "20px",
                      fontWeight: "800",
                      borderRadius: "20px",
                    }}
                    onClick={() => this.votePost(0)}
                  >
                    <ThumbDownIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default withRouter(PostCard);
