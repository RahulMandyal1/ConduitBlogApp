import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import Signin from "./Signin";
import Signup from "./Signup";
import Singlepost from "./Singlepost";
import { localStorageKey, userVerifyURL } from "../utils/constant";
import Fullpagespinner from "./Fullpagespinner";
import NotFound from "./NotFound";
import NewPost from "./NewPost";
import Setting from "./Setting";
import UserProfile from "./UserProfile";
export default class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerified: true,
  };

  componentDidMount() {
    const storageKey = localStorage.getItem(localStorageKey);
    fetch(userVerifyURL, {
      method: "GET",
      headers: {
        authorization: `Token ${storageKey}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.updateUser(user);
      })
      .catch((error) => {
        this.setState({ isVerified: false });
      });
  }

  updateUser = (userData) => {
    this.setState({
      isLoggedIn: true,
      user: userData,
      isVerified: false,
    });
    localStorage.setItem(localStorageKey, userData.token);
  };

  render() {
    if (this.state.isVerified) {
      return <Fullpagespinner />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp updateUser={this.updateUser} />
        ) : (
          <UnauthenticatedApp />
        )}
      </>
    );
  }
}

function UnauthenticatedApp(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/register">
          <Signup updateUser={props.updateUser} />
        </Route>
        <Route path="/login">
          <Signin updateUser={props.updateUser} />
        </Route>
        <Route path="/article">
          <Singlepost />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

function AuthenticatedApp() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/article">
          <Singlepost />
        </Route>
        <Route path="/article/new">
          <NewPost />
        </Route>
        <Route path="/settings">
          <Setting />
        </Route>
        <Route path="/users/profile">
          <UserProfile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
