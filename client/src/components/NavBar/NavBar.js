import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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
}));

function NavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.toolbar}>
        <Toolbar className={classes.title}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <div>FakrNews.io</div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
