import React, { Component } from "react";
import ProfileBannar from "./ProfileBannar";
import { articlesURL } from "../utils/constant";
import { TbHotelService } from "react-icons/tb";
import Posts from "./Posts";
import Loader from "./Loader";
export default class Profile extends Component {
  state = {
    tab: "author",
    articles: null,
  };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let tab = this.state.tab;
    console.log(this.props.user);
    fetch(articlesURL + `?${tab}=${this.props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          return "article is not found";
        }
        return res.json();
      })
      .then((data) => {
        console.log("all the user articles are found here ");
        this.setState({
          articles: data,
        });
      });
  };

  handleClick = ({ target }) => {
    const { id } = target;
    console.log(" this is  the name of the target" , id);
    this.setState({
      tab: id,
    });
    this.getData();
  };

  render() {
    const tab = this.state.tab;
    const articles = this.state.articles;
    return (
      <section className="profile-container">
        <ProfileBannar />
        <div className="otherpost-container">
          <ul className="navmenus-container flex-row-center">
            <li
              onClick={this.handleClick}
              id="author"
              className={"author" === tab && "active-menu"}
            >
              My Articles
            </li>
            <li
              onClick={this.handleClick}
              id="favorited"
              className={"favorited" === tab && "active-menu"}
            >
              Favourited Articles
            </li>
          </ul>
          <div className="post-container">
            {articles === null ? <Loader/> : <Posts data={articles} />}
          </div>
        </div>
      </section>
    );
  }
}
