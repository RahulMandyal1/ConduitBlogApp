import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import Signin from "./Signin";
import Signup from "./Signup";
export default class App extends Component {
  render() {
    return (
      <Switch>
        <>
          <Header />
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
          <Route path="/login">
            <Signin/>
          </Route>
        </>
      </Switch>
    );
  }
}
