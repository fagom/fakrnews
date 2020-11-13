import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

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
      color: "white",
      backgroundColor: "green",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "red",
        width: "11em",
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
      color: "white",
      backgroundColor: "green",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "red",
        width: "11em",
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
      color: "white",
      backgroundColor: "green",
      borderRadius: "3px",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "red",
        width: "11em",
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
      "&:hover": {
        backgroundColor: "red",
        color: "white",
        width: "11em",
      },
    },
  },
}));
function SideNavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.home}>Home</div>
      <div className={classes.create}>Create</div>
      <div className={classes.create}>Notifications</div>
      <div className={classes.profile}>Profile</div>
      <div className={classes.more}>More</div>
    </div>
  );
}
export default SideNavBar;
