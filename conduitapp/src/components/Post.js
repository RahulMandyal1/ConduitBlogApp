import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { localStorageKey } from "../utils/constant";
import { articlesURL } from "../utils/constant";
import dateToNormal from "../utils/helper";
const token = localStorage[localStorageKey];

export default class Post extends Component {
  state = {
    article: this.props.article,
  };

  increaseLike = (event, slug) => {
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "POST",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        this.setState({
          article: article,
        });
      });
  };

  render() {
    let post = this.state.article;
    return (
      <article className="readmorepost flex-col">
        <div className="additionalInfo-container flex-row">
          <div className="userinfo-containers flex-row">
            <figure>
              <Link to={`/profile/${post.author.username}`}>
                <img
                  src={
                    post.author.image
                      ? post.author.image
                      : "/images/smiley-cyrus.jpg"
                  }
                  alt="userprofile"
                />
              </Link>
            </figure>
            <div className="username-date">
              <Link to={`/profile/${post.author.username}`}>
                <h4>{post.author.username}</h4>
              </Link>
              <time>
                <p className="post-time">{dateToNormal(post.createdAt)}</p>
              </time>
            </div>
          </div>
          <div className="likes-container">
            <button
              className="like-btn flex-row-center"
              onClick={(event) => {
                this.increaseLike(event, post.slug);
              }}
            >
              <span id="heart-icon">
                <BsFillSuitHeartFill />
              </span>
              <span>{post.favoritesCount}</span>
            </button>
          </div>
        </div>
        <h2 className="post-heading">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        <div className="readmore-tags flex-row">
          <button className="tertiary-btn">
            <Link to={`/article/${post.slug}`}>Readmore....</Link>
          </button>
          <ul className="tags-containers flex-row-center">
            {post.tagList.length > 0 &&
              post.tagList.map((tag) => (
                <li className="post-tag" key={tag}>
                  {tag}
                </li>
              ))}
          </ul>
        </div>
      </article>
    );
  }
}
