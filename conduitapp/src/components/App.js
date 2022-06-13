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
import withRouter from "../utils/withRouter";
import Article from "./Article";
import { dataContext } from "./BlogContext";

class App extends Component {
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
      displaynavmenus: true,
    });
    localStorage.setItem(localStorageKey, userData.token);
  };

  logout = () => {
    this.setState({
      isLoggedIn: false,
    });
    localStorage.clear();
    this.props.navigate("/");
  };

  render() {
    // send this data in the context to all the  components
    const data = {
      ...this.state,
      updateUser: this.updateUser,
      logout: this.logout,
    };

    if (this.state.isVerified) {
      return <Fullpagespinner />;
    }
    
    return (
      <>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user}
          togglemenus={this.togglemenus}
        />
        {this.state.isLoggedIn ? (
          <dataContext.Provider value={data}>
            <AuthenticatedApp />
          </dataContext.Provider>
        ) : (
          <dataContext.Provider value={data}>
            <UnauthenticatedApp updateUser={this.updateUser} />
          </dataContext.Provider>
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
        <Route path="/article/new" element={<NewPost />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/article/:slug" element={<Singlepost />} />
        <Route path="/updatearticle/:slug" element={<UpdateArticle />} />
        <Route path="/profile/:username" element={<Profile />} />
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
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default withRouter(App);
