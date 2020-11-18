import { Button, Container } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function LoginPage() {
  const styles = useStyles();
  return (
    <div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <div>FAKE</div>
        <div>NEWS</div>
      </div>
      <Button variant="contained" color="primary" href="/auth/google">
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
