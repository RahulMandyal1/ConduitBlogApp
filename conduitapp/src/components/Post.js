import React from "react";
import { Link } from "react-router-dom";
import { BsFillSuitHeartFill } from "react-icons/bs";
export default function Post(props) {
  const post = props.article;
  return (
    <article className="readmorepost flex-col">
      <div className="additionalInfo-container flex-row">
        <div className="userinfo-containers flex-row">
          <figure>
            <img
              src={
                post.author.image
                  ? post.author.image
                  : "/images/smiley-cyrus.jpg"
              }
              alt="userprofile"
            />
          </figure>
          <div className="username-date">
            <h4>{post.author.username}</h4>
            <time>
              <p className="post-time">Fri jun 03 2022</p>
            </time>
          </div>
        </div>
        <div className="likes-container">
          <button className="like-btn flex-row-center">
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
        <ul className="tags-containers">
          <li className="post-tag">pubg</li>
        </ul>
      </div>
    </article>
  );
}
