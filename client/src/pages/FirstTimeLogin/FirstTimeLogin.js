import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../actions";
import { Avatar, Button, Container, Grid, TextField } from "@material-ui/core";
class FirstTimeLogin extends Component {
  COLORS = ["#007ee5", "#bd081c", "#ff6600", "#131418", "#410093"];
  state = {
    firstname: this.props.auth.firstname,
    surname: this.props.auth.surname,
    colorIndex: 0,
    userIconColor: this.COLORS[0],
    username: "",
    buttonDisable: true,
    usernameHelperText: "Username must be between 6 and 30 characters.",
  };
  iconChooser = (value) => {
    this.setState({ colorIndex: value, userIconColor: this.COLORS[value] });
  };
  componentDidMount() {
    this.setState({
      fistname: this.props.auth.firstname,
      surname: this.props.auth.surname,
      colorIndex: 0,
      userIconColor: this.COLORS[0],
    });
  }

  firstNameChange = (event) => {
    let changevalue = event.target.value;
    let btndisable = false;
    if (
      changevalue === "" ||
      changevalue === undefined ||
      this.state.username === "" ||
      this.state.surname === ""
    ) {
      btndisable = true;
    }
    this.setState({ firstname: changevalue, buttonDisable: btndisable });
  };
  userNameChange = (event) => {
    let changevalue = event.target.value;
    let btndisable = false;
    if (
      changevalue === "" ||
      changevalue === undefined ||
      changevalue.length < 6 ||
      changevalue.length > 30 ||
      this.state.firstname === "" ||
      this.state.surname === ""
    ) {
      btndisable = true;
    }
    this.setState({
      username: changevalue,
      buttonDisable: btndisable,
      usernameHelperText: "Username must be between 6 and 30 characters.",
    });
  };
  surnameChange = (event) => {
    let changevalue = event.target.value;
    let btndisable = false;
    if (
      changevalue === "" ||
      changevalue === undefined ||
      this.state.username === "" ||
      this.state.firstname === ""
    ) {
      btndisable = true;
    }
    this.setState({ surname: changevalue, buttonDisable: btndisable });
  };
  updateUserDetails = async () => {
    const usernamecheck = await axios.get(`/api/user/${this.state.username}`);

    if (usernamecheck.status === 200) {
      this.setState({ usernameHelperText: "Username already exists." });
    } else {
      const updateresponse = await axios.post("/api/user/update", {
        _id: this.props.auth._id,
        fullname: this.state.fistname + " " + this.state.surname,
        firstname: this.state.firstname,
        surname: this.state.surname,
        emailid: this.props.auth.emailid,
        profilePic: this.props.auth.profilePic,
        username: this.state.username,
        userIconColor: this.state.userIconColor,
        firsttimelogin: "N",
      });
      if (updateresponse.status === 200) {
        let fetchuser = this.props.fetchUser;

        fetchuser();
      }
    }
  };
  render() {
    return (
      <div>
        <NavBar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Container maxWidth="sm">
          <h2>Personal Information</h2>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="First Name"
                value={this.state.firstname}
                onChange={this.firstNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Surname"
                value={this.state.surname}
                onChange={this.surnameChange}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Username"
                value={this.state.username}
                onChange={this.userNameChange}
                helperText={this.state.usernameHelperText}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              <h2>Choose a color for your profile Icon</h2>
            </Grid>
            {this.COLORS.map((color, index) => {
              if (index === this.state.colorIndex) {
                return (
                  <Grid item xs={2} key={index}>
                    <Avatar
                      style={{
                        width: "37px",
                        height: "37px",
                        backgroundColor: color,
                        border: "5px solid black",
                        cursor: "pointer",
                      }}
                      onClick={() => this.iconChooser(index)}
                    >
                      {" "}
                    </Avatar>
                  </Grid>
                );
              }
              return (
                <Grid item xs={2} key={index}>
                  <Avatar
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: color,
                      cursor: "pointer",
                    }}
                    onClick={() => this.iconChooser(index)}
                  >
                    {" "}
                  </Avatar>
                </Grid>
              );
            })}
          </Grid>
          <Grid container style={{ marginTop: "40px" }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{
                  backgroundColor:
                    this.state.buttonDisable === true ? "grey" : "#007ee5",
                  color: "white",
                }}
                disabled={this.state.buttonDisable}
                onClick={this.updateUserDetails}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state, actions) {
  return {
    auth: state.auth,
    actions: actions,
  };
}
export default connect(mapStateToProps, actions)(FirstTimeLogin);
