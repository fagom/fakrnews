import {
  Avatar,
  Button,
  Card,
  CardContent,
  DialogContent,
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { ReactTinyLink } from "react-tiny-link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import RedditIcon from "@material-ui/icons/Reddit";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import FacebookIcon from "@material-ui/icons/Facebook";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";

const urlRegex = require("url-regex");
class PostCard extends Component {
  MAX_WIDTH = window.innerWidth > 560 ? 200 : 280;
  SHARE_POP_WIDTH = window.innerWidth / 2;
  SHARE_POP_HEIGHT = window.innerHeight / 4;
  LINK = `http://locahost:3000/post/${this.props._post}`;

  SHARE_LIST = [
    {
      button: (
        <FacebookShareButton url={this.LINK} quote={this.props.posttitle}>
          <FacebookIcon
            style={{ fontSize: "32px", float: "left", color: "#3b5998" }}
          />
        </FacebookShareButton>
      ),
      name: "Facebook",
    },
    {
      button: (
        <LinkedinShareButton url={this.LINK} quote={this.props.posttitle}>
          <LinkedInIcon
            style={{ fontSize: "32px", float: "left", color: "#0e76a8" }}
          />
        </LinkedinShareButton>
      ),
      name: "Linkedin",
    },
    {
      button: (
        <RedditShareButton url={this.LINK} quote={this.props.posttitle}>
          <RedditIcon
            style={{ fontSize: "32px", float: "left", color: "#FF4500" }}
          />
        </RedditShareButton>
      ),
      name: "Reddit",
    },
    {
      button: (
        <TwitterShareButton url={this.LINK} quote={this.props.posttitle}>
          <TwitterIcon
            style={{ fontSize: "32px", float: "left", color: "#00acee" }}
          />
        </TwitterShareButton>
      ),
      name: "Twitter",
    },
    {
      button: (
        <WhatsappShareButton url={this.LINK} quote={this.props.posttitle}>
          <WhatsAppIcon
            style={{ fontSize: "32px", float: "left", color: "#4FCE5D" }}
          />
        </WhatsappShareButton>
      ),
      name: "Whatsapp",
    },
  ];

  state = {
    createddate: null,
    voted: false,
    fullname: "",
    firstname: "",
    surname: "",
    userIconColor: "",
    posttitle: "",
    totalvotes: 0,
    votecount: [],
    uservotedvalue: null,
    popoveropen: false,
    username: "",
    shareLinks: [],
    moreLink: false,
    anchorEl: null,
    moreLinkId: undefined,
    _user: "",
    shareLinkPop: false,
    deletePop: false,
  };

  handleClose = () => {
    this.setState({ moreLink: false, anchorEl: null, moreLinkId: undefined });
  };
  openMoreLinkPop = (event) => {
    this.setState({
      moreLink: true,
      anchorEl: event.currentTarget,
      moreLinkId: "simple-popover",
    });
  };
  shareLinkPop = () => {
    this.setState({ shareLinkPop: true, moreLink: false });
  };
  handleshareLinkClose = () => {
    this.setState({ shareLinkPop: false });
  };
  deletePop = () => {
    this.setState({ deletePop: true, moreLink: false });
  };
  handleDeletePopClose = () => {
    this.setState({ deletePop: false });
  };
  deleteCard = () => {
    this.setState({ deletePop: false });
    this.props.deletePost();
  };
  componentDidMount() {
    let isLink = urlRegex().test(this.props.posttitle);
    moment.updateLocale("en", null);

    this.setState({
      createddate: moment(new Date(this.props.createddate)).fromNow(), //format("MM/DD/YY"),
      fullname: this.props.fullname,
      //createddate: this.props.createddate,
      posttitle: this.props.posttitle,
      totalvotes: this.props.totalvotes,
      votecount: this.props.votecount,
      voted: this.props.uservotedvalue === null ? false : true,
      firstname: this.props.firstname,
      surname: this.props.surname,
      userIconColor: this.props.userIconColor,
      uservotedvalue: this.props.uservotedvalue,
      username: this.props.username,
      shareLinks: isLink === true ? this.props.posttitle.match(urlRegex()) : [],
      _user: this.props._user,
    });
  }

  votePost = async (value) => {
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
  };

  // deletePost = () => {
  //   console.log(this.props._post);
  // };

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
                    //backgroundColor: this.state.userIconColor,
                    background: `linear-gradient(45deg, ${this.state.userIconColor} 30%, #f4a261 90%)`,
                  }}
                  alt="FN"
                >
                  {this.state.firstname[0] + this.state.surname[0] || ""}
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
                    {this.state.createddate}
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
          <CardContent style={{ paddingTop: "0px", paddingBottom: "0px" }}>
            <div className="post__title">
              <Linkify>{this.state.posttitle}</Linkify>
            </div>
            <div>
              {this.state.shareLinks.length === 1
                ? this.state.shareLinks.map((link, index) => {
                    if (index === 0) {
                      return (
                        <ReactTinyLink
                          key={index}
                          showGraphic={true}
                          maxLine={2}
                          minLine={1}
                          description=""
                          proxyUrl="https://fakrnews-cors-proxy.herokuapp.com"
                          url={link}
                          autoPlay={true}
                        />
                      );
                    }
                    return null;
                  })
                : null}
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
              <div style={{ fontSize: "12px" }}>
                Votes: {this.state.votecount[1]}
              </div>
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
              <div style={{ fontSize: "12px" }}>
                Votes: {this.state.votecount[0]}
              </div>
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
                        this.state.uservotedvalue === 1 ? "#379683" : "#007ee5",
                      borderRadius: "20px",
                      fontWeight: "800",
                    }}
                    onClick={() => this.votePost(1)}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={8}>
                  <IconButton
                    variant="outlined"
                    style={{
                      //backgroundColor: "#007ee5",
                      color:
                        this.state.uservotedvalue === 0 ? "#379683" : "#007ee5",
                      borderRadius: "20px",
                      fontWeight: "800",
                    }}
                    onClick={() => this.votePost(0)}
                  >
                    <ThumbDownIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    variant="outlined"
                    style={
                      {
                        //backgroundColor: "#007ee5",
                        // color:
                        //   this.state.uservotedvalue === 0 ? "#379683" : "#007ee5",
                        // borderRadius: "20px",
                        // fontWeight: "800",
                        // borderRadius: "20px",
                      }
                    }
                    onClick={this.openMoreLinkPop}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Popover
                    id={this.state.moreLinkId}
                    open={this.state.moreLink}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchororigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformorigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <List component="nav" aria-label="mailbox folders">
                      {this.state._user === this.props.curruser._id ? (
                        <ListItem
                          style={{ cursor: "pointer" }}
                          onClick={this.deletePop}
                        >
                          <ListItemAvatar>
                            <Avatar
                              style={{ backgroundColor: "#F5F5F5" }}
                              alt="FN"
                            >
                              <DeleteIcon style={{ color: "red" }} />
                            </Avatar>
                          </ListItemAvatar>
                          <div style={{ color: "black", fontWeight: "bold" }}>
                            Delete
                          </div>
                        </ListItem>
                      ) : null}

                      <ListItem
                        style={{ cursor: "pointer" }}
                        onClick={this.shareLinkPop}
                      >
                        <ListItemAvatar>
                          <Avatar
                            style={{ backgroundColor: "#F5F5F5" }}
                            alt="FN"
                          >
                            <ShareIcon style={{ color: "#007ee5" }} />
                          </Avatar>
                        </ListItemAvatar>

                        <div
                          style={{
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          Share
                        </div>
                      </ListItem>
                    </List>
                  </Popover>
                  <Popover
                    id={this.state.moreLinkId}
                    anchorreference="anchorPosition"
                    open={this.state.shareLinkPop}
                    //anchorEl={this.state.anchorEl}
                    anchorposition={{
                      top: this.SHARE_POP_HEIGHT,
                      left: this.SHARE_POP_WIDTH,
                    }}
                    onClose={this.handleshareLinkClose}
                    anchororigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformorigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <h2
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        marginBottom: "0px",
                      }}
                    >
                      Share
                    </h2>
                    <List style={{ display: "flex" }}>
                      {this.SHARE_LIST.map((item, index) => {
                        return <ListItem key={index}>{item.button}</ListItem>;
                      })}
                    </List>
                  </Popover>
                  <Dialog
                    id={this.state.moreLinkId}
                    anchorreference="anchorPosition"
                    open={this.state.deletePop}
                    //anchorEl={this.state.anchorEl}
                    anchorposition={{
                      top: this.SHARE_POP_HEIGHT,
                      left: this.SHARE_POP_WIDTH,
                    }}
                    onClose={this.handleDeletePopClose}
                    anchororigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformorigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <DialogContent dividers>
                      <div
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Delete Post
                      </div>
                    </DialogContent>
                    <DialogContent>
                      <div>Are you sure you want to delete the post?</div>
                    </DialogContent>
                    <DialogContent>
                      <Grid container>
                        <Grid item xs={9}>
                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "#dc2f02",
                            }}
                            onClick={this.deleteCard}
                          >
                            Yes
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "#007f5f",
                            }}
                          >
                            No
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogContent>
                  </Dialog>
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
