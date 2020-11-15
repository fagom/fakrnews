import { Button } from "@material-ui/core";
import React, { Component } from "react";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <Button variant="contained" color="primary" href="/auth/google">
          Login
        </Button>
      </div>
    );
  }
}

export default LoginPage;
