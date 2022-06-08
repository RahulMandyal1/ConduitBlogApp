import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import Bannar from "./Bannar";
import FeedNav from "./FeedNav";
import Posts from "./Posts";
import Sidebar from "./Sidebar";


export default class Homepage extends Component {
  state = {
    articles: null,
    tags: null,
    feed: "/articles",
    error: "",
    totalArticles: "",
    activePage: "",
  };

  // for the first go after render it will change our state
  componentDidMount() {
    this.fetch();
  }

  fetch=()=>{
    fetch(articlesURL + `?offset=${this.state.skipPages}?limit=10`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      this.setState({
        articles: data,
        totalArticles: data.articlesCount,
      });
    })
    .catch((error) => {
      this.setState({
        error: "something went wrong not able to fetch",
      });
    });
  }

  render() {
    let { articles, error } = this.state;
    return (
      <section className="hero">
        <Bannar />
        {/* <FeedNav feed={this.state.feed} /> */}
        <div className="content-container flex-row">
<<<<<<< Updated upstream
          <Posts articles={articles} error={error} />
          <aside className="sidebar-container">
            <Sidebar />
          </aside>
=======
          <div className="articles-container">
            <FeedNav activeTab={activeTab} emptyTab={this.emptyTab} />
            <Posts
              data={articles}
              error={error}
            />
            <Pagination
              totalArticles={totalArticles}
              activePage={activePage}
              nextPage={this.getNextPage}
            />
          </div>
          <Sidebar getTagArticles={this.getTagRelatedArticles} />
>>>>>>> Stashed changes
        </div>
      </section>
    );
  }
}
