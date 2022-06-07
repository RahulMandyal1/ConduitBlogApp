import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
export default class Singlepost extends Component {
  state = {
    article: undefined,
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
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
          <article className="singlepost-wrapper">
            <div className="article-bannar-container">
              <div className="article-bannar flex-col">
                <h2 className="title">{article.title}</h2>
                <div className="additionalInfo-container flex-row">
                  <div className="userinfo-container flex-row">
                    <figure>
                      <img src="/images/smiley-cyrus.jpg" alt="userprofile" />
                    </figure>
                    <div className="username-date">
                      <h4>{article.author.username} </h4>
                      <time>
                        <p className="post-time">Fri jun 03 2022</p>
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="articlebody-container">
              <p className="article-body">{article.body}</p>
            </div>
          </article>
        </section>
      </>
    );
  }
}
