import React, { Component } from "react";
import ProfileBannar from "./ProfileBannar";
import { articlesURL, profileURL } from "../utils/constant";
import Posts from "./Posts";
import Loader from "./Loader";
import withRouter from "../utils/withRouter";
import { localStorageKey } from "../utils/constant";
import { dataContext } from "./BlogContext";
const token = localStorage[localStorageKey];

class Profile extends Component {
  static contextType = dataContext;
  state = {
    tab: "author",
    profile: null,
    currentuser: this.context.user,
    articles: null,
    isfollowing: null,
  };

  //as componet gets mounted get the user profile
  componentDidMount() {
    this.getProfile();
  }

  //get all the user releated data or articles
  componentDidUpdate() {
    if (!this.state.articles) {
      this.getProfileArticles();
    }
  }

  //get user profile
  getProfile = () => {
    const username = this.props.params.username;
    fetch(profileURL + username)
      .then((res) => res.json())
      .then((user) => {
        this.setState({
          profile: user.profile,
          isfollowing: user.profile.following,
        });
      });
  };

  //get profile articles
  getProfileArticles = () => {
    const username = this.props.params.username;
    const tab = this.state.tab;
    fetch(articlesURL + `?${tab}=${username}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          articles: data,
        });
      });
  };

  // follow   user  returns targated used profile
  followUser = (event, username) => {
    event.preventDefault();
    fetch(profileURL + `/${username}/follow`, {
      method: "POST",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(({ profile }) => {
        this.setState({ isfollowing: true });
      });
  };

  //unfollow  user returns targated user profile
  unFollowUser = (event, username) => {
    event.preventDefault();
    fetch(profileURL + `/${username}/follow`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(({ profile }) => {
        this.setState({ isfollowing: false });
      });
  };

  //change tab 
  handleClick = ({ target }) => {
    const { id } = target;
    this.setState({
      tab: id,
    });
    let tabArticles = this.getProfileArticles();
    this.setState({
      articles: tabArticles,
    });
  };

  render() {
    const tab = this.state.tab;
    const articles = this.state.articles;
    const profile = this.state.profile;

    if (!profile) {
      return <Loader />;
    }

    if (!articles) {
      return <Loader />;
    }

    return (
      <section className="profile-container">
        <ProfileBannar
          articleUser={this.state.profile}
          currentUser={this.state.currentuser}
          isfollowing={this.state.isfollowing}
          followUser={this.followUser}
          unFollowUser={this.unFollowUser}
        />
        <div className="otherpost-container">
          <ul className="navmenus-container profile-nav">
            <li
              onClick={this.handleClick}
              id="author"
              className={"author" === tab ? "active-menu" : ""}
            >
              My Articles
            </li>
            <li
              onClick={this.handleClick}
              id="favorited"
              className={"favorited" === tab ? "active-menu" : ""}
            >
              Favourited Articles
            </li>
          </ul>
          <div className="post-container">
            {articles === null ? <Loader /> : <Posts data={articles} />}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Profile);
