import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
import withRouter from "../utils/withRouter";
import Comments from "./Comments";
import dateToNormal from "../utils/helper";

class Article extends Component {
  state = {
    article: undefined,
    currentUser: this.props.user,
  };

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

  render() {
    const article = this.state.article;
    if (article === undefined) {
      return <Loader />;
    }
    return (
      <>
        <section className="singlepost-container">
          <RenderPost article={article} />
          <div className="user-form comment-container">
            <div className="container center  border-gray">
              <Comments currentUser={undefined} articleUrl={article.slug} />
            </div>
          </div>
        </section>
      </>
    );
  }
}

function RenderPost(props) {
  const article = props.article;
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
                    <p className="post-time">
                      {dateToNormal(article.createdAt)}
                    </p>
                  </time>
                </div>
                <div className="button-container"></div>
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

export default withRouter(Article);
