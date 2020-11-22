import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles((theme) => ({
  load: {
    backgroundColor: "black",
    color: "white",
    fontSize: "25px",
    fontWeight: "900",
  },
  ing: {
    fontSize: "25px",
    fontWeight: "900",
  },
}));

function Loading() {
  const styles = useStyles();
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.load}>Load</div>
      <div className={styles.ing}>ing...</div>
    </div>
  );
}

export default Loading;
