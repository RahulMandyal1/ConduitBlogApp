import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
import withRouter from "../utils/withRouter";
import { Link } from "react-router-dom";
import { localStorageKey } from "../utils/constant";
import Comments from "./Comments";
import dateToNormal from "../utils/helper";
const token = localStorage[localStorageKey];

class Singlepost extends Component {
  state = {
    article: undefined,
    currentUser: this.props.user,
  };

  // get article as soon as component is mounted 
  componentDidMount() {
    let slug = this.props.params.slug;
    fetch(articlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          return "article is not found";
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
        });
      });
  }

  // delete user article  
  deleteArticle = () => {
    let article = this.props.params.slug;
    fetch(articlesURL + "/" + article, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return this.props.navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        this.props.navigate("/");
      });
  };

  render() {
    const currentUser = this.state.currentUser;
    const article = this.state.article;
    if (article === undefined) {
      return <Loader />;
    }
    return (
      <>
        <section className="singlepost-container">
          <RenderPost
            currentUser={currentUser}
            article={article}
            deleteArticle={this.deleteArticle}
          />
          <div className="user-form comment-container">
            <div className="container center  border-gray">
              <Comments currentUser={currentUser} articleUrl={article.slug} />
            </div>
          </div>
        </section>
      </>
    );
  }
}

function RenderPost(props) {
  const currentUser = props.currentUser;
  const article = props.article;
  const deleteArticle = props.deleteArticle;
  return (
    <>
      <article className="singlepost-wrapper">
        <div className="article-bannar-container">
          <div className="article-bannar flex-col">
            <h2 className="title">{article.title}</h2>
            <div className="additionalInfo-container flex-row">
              <div className="userinfo-container flex-row">
                <figure>
                  <img
                    src={
                      article.author.image
                        ? article.author.image
                        : "/images/smiley-cyrus.jpg"
                    }
                    alt="userprofile"
                  />
                </figure>
                <div className="username-date">
                  <h4>{article.author.username} </h4>
                  <time>
                    <p className="post-time">{dateToNormal(article.createdAt)}</p>
                  </time>
                </div>
                <div className="button-container">
                  {currentUser.username === article.author.username && (
                    <div className="button-container">
                      <Link to={`/updatearticle/${article.slug}`}>
                        <button className="secondary-btn edit-btn">
                          Edit Article
                        </button>
                      </Link>
                      <button
                        className="secondary-btn delete-btn"
                        onClick={deleteArticle}
                      >
                        Delete Article
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="articlebody-container">
          <p className="article-body">{article.body}</p>
        </div>
      </article>
    </>
  );
}

export default withRouter(Singlepost);
