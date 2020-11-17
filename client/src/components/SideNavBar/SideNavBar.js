import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    float: "center",
    marginTop: "3em",
  },
  home: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      display: "block",
      textAlign: "center",
      fontSize: "1em",
      fontWeight: "bold",
      width: "10em",
      color: "black",
      // backgroundColor: "#007ee5",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      border: "1px solid green",
      "&:hover": {
        backgroundColor: "green",
        color: "white",
        // width: "11em",
      },
    },
  },
  create: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      display: "block",
      textAlign: "center",
      fontSize: "1em",
      fontWeight: "bold",
      width: "10em",
      color: "black",
      // backgroundColor: "green",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      border: "1px solid green",
      "&:hover": {
        backgroundColor: "green",
        color: "white",
        // width: "11em",
      },
    },
  },
  profile: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      display: "block",
      textAlign: "center",
      fontSize: "1em",
      fontWeight: "bold",
      width: "10em",
      color: "black",
      // backgroundColor: "green",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      border: "1px solid green",
      "&:hover": {
        backgroundColor: "green",
        color: "white",
        // width: "11em",
      },
    },
  },
  more: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      display: "block",
      textAlign: "center",
      fontSize: "1em",
      fontWeight: "bold",
      width: "10em",
      color: "black",
      //backgroundColor: "green",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      border: "1px solid green",
      "&:hover": {
        backgroundColor: "green",
        color: "white",
        // width: "11em",
      },
    },
  },
}));

function SideNavBar(props) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState("");
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  const handleClickOpen = () => {
    setPost("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPost("");
  };

  const onPostChange = (event) => {
    let value = event.target.value;
    setPost(value);
  };

  // useEffect(() => {
  //   console.log("sda");
  //   setOpen(false);
  //   setPost("");
  // });
  const createPost = async () => {
    const body = {
      posttitle: post,
      _user: props.auth._id,
      fullname: props.auth.fullname,
      firstname: props.auth.firstname,
      surname: props.auth.surname,
      profilePic: props.auth.profilePic,
      userbio: props.auth.userbio,
      username: props.auth.username,
      userIconColor: props.auth.userIconColor,
    };

    const response = await axios.post("/api/post/create", body);

    if (response.status === 200) {
      let refresh = props.refreshScreen;
      refresh();
      //setOpen(false);
      //setPost("");
    }
  };

  const profileTargetLink = {
    pathname:
      props.auth === null || props.auth === false
        ? "/"
        : `/profile/${props.auth.username}`,
    key: uuid(),
    state: {
      applied: true,
    },
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Link className={classes.home} to="/">
          Home
        </Link>
      </div>
      <div className={classes.create} onClick={handleClickOpen}>
        Create
      </div>
      <div className={classes.create}>Explore</div>
      <div className={classes.create}>Activity</div>

      <div>
        <Link className={classes.profile} to={profileTargetLink}>
          Profile
        </Link>
      </div>
      <div>
        <a href="/api/logout" className={classes.more}>
          Logout
        </a>
      </div>
      <Dialog
        maxWidth={"xs"}
        fullWidth={true}
        open={open}
        //TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div style={{ fontWeight: "800", textAlign: "center" }}>
            Create Post
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            style={{
              width: "100%",
              border: "0px solid white",
            }}
            multiline
            variant="outlined"
            rows={5}
            placeholder="Whats Fake today?"
            value={post}
            onChange={onPostChange}
            inputProps={{ maxLength: 500 }}
          />
          <h4>Tips:</h4>
          <h5>1. Try to provide the Link of the source for a better result.</h5>
          <h5>
            2. Please cross-check for any grammatical or spelling mistakes.
          </h5>
          <h5>
            3. Try and make sure the Article has not been shared before. We
            would hate for any duplicate posts hampering the results in your
            post.
          </h5>
        </DialogContent>

        <DialogActions>
          <Button onClick={createPost} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SideNavBar;
