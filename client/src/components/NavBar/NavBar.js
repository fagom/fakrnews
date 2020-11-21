import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import PolicyIcon from "@material-ui/icons/Policy";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";
import uuid from "react-uuid";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    textAlign: "center",
    float: "center",
    fontSize: "2em",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5em",
      display: "inline-block",
      fontWeight: "bold",
      textAlign: "center",
      float: "center",
    },
  },
  navigations: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      margin: theme.spacing(2),
    },
  },
  toolbar: {
    backgroundColor: "white",
    color: "black",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  icon: {
    margin: "10px",
    display: "flex",
    alignItems: "center",
    // textAlign: "center",
    fontSize: "20px",
    fontWeight: "500",
    //marginRight: "20px",
    //width: "10em",
    color: "black",
    // backgroundColor: "#007ee5",
    borderRadius: "3px",
    //background: "linear-gradient(45deg, #e76f51 30%, #f4a261 90%)",
    //padding: "10px",
    cursor: "pointer",
    //border: "1px solid #379683",
    "&:hover": {
      // backgroundColor: "#379683",
      background: "linear-gradient(45deg, #e76f51 30%, #f4a261 90%)",
      color: "white",
      borderRadius: "30px",
      // width: "11em",
      transition: "color 100ms ease-out",
    },
  },
}));

function NavBar(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [mobileToggle, setmobileToggle] = React.useState(false);
  const [createBtn, setCreateBtn] = React.useState(true);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState("");
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  const handleClickOpen = () => {
    setPost("");
    setOpen(true);
    toggleDrawer("left", false);
  };

  const handleClose = () => {
    setOpen(false);
    setPost("");
  };

  const onPostChange = (event) => {
    let value = event.target.value;
    if (value.length === 0 || value === "" || value === undefined) {
      setCreateBtn(true);
    } else {
      setCreateBtn(false);
    }
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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2
        style={{ marginLeft: "25px", alignItems: "center", fontWeight: "900" }}
      >
        FakrNews
      </h2>
      <List>
        <div>
          <Link to="/" className={classes.icon}>
            <HomeIcon style={{ padding: "10px" }} />
            <div>Home</div>
          </Link>
        </div>
        {props.auth === null || props.auth === false ? (
          <Link className={classes.icon} to="/">
            <PostAddIcon style={{ padding: "10px" }} />
            Create
          </Link>
        ) : (
          <div className={classes.icon} onClick={handleClickOpen}>
            <PostAddIcon style={{ padding: "10px" }} />
            Create
          </div>
        )}
        <div className={classes.icon}>
          <FindInPageIcon style={{ padding: "10px" }} />
          Explore
        </div>
        <div className={classes.icon}>
          <NotificationsActiveIcon style={{ padding: "10px" }} />
          Activity
        </div>
        <div className={classes.icon}>
          <PolicyIcon style={{ padding: "10px" }} />
          Privacy Policy
        </div>

        <div>
          <Link className={classes.icon} to={profileTargetLink}>
            <AccountCircleIcon style={{ padding: "10px" }} />
            Profile
          </Link>
        </div>
        <div>
          <a href="/api/logout" className={classes.icon}>
            <ExitToAppIcon style={{ padding: "10px" }} />
            Logout
          </a>
        </div>
      </List>
    </div>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("event", event.type);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.toolbar}>
        <Toolbar className={classes.title}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <React.Fragment key="left">
            <Drawer
              anchor="left"
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
          <div>FakrNews.io</div>
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
              <h5>
                1. Try to provide the Link of the source for a better result.
              </h5>
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
              <Button
                onClick={createPost}
                color="primary"
                variant="contained"
                disabled={createBtn}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
