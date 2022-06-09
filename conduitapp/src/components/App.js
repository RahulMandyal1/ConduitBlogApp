import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
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
import Profile from "./Profile";
import UpdateArticle from "../components/UpdateArticle";
export default class App extends Component {
  state = {
    isLoggedIn: false,
    user: undefined,
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
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        ) : (
          <UnauthenticatedApp updateUser={this.updateUser} />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route
          path="/article/new"
          element={<NewPost token={props.user.token} />}
        />
        <Route path="/settings" element={<Setting user={props.user} />} />
        <Route
          path="/article/:slug"
          element={<Singlepost user={props.user} />}
        />
        <Route path="/updatearticle/:slug" element={<UpdateArticle />} />
        <Route
          path="/profile/:username"
          element={<Profile user={props.user} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function UnauthenticatedApp(props) {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route
          path="/register"
          element={<Signup updateUser={props.updateUser} />}
        />
        <Route
          path="/login"
          element={<Signin updateUser={props.updateUser} />}
        />
        <Route
          path="/article/:slug"
          element={<Singlepost user={props.user} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
