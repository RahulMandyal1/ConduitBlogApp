import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import Bannar from "./Bannar";
import FeedNav from "./FeedNav";
import Pagination from "./Pagination";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
export default class Homepage extends Component {
  state = {
    articles: null,
    tags: null,
    feed: "/articles",
    error: "",
    totalArticles: "",
    activePage: 1,
    activeTab: "",
  };

  // for the first go after render it will change our state
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.activePage !== this.state.activePage ||
      previousState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    let skipPages = (this.state.activePage - 1) * 10;
    let limit = 10;
    const tag = this.state.activeTab;
    fetch(
      articlesURL +
        `?offset=${skipPages}&limit=${limit}` +
        (tag && `&tag=${tag}`)
    )
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
  };

  // get next article page
  getNextPage = ({ target }) => {
    let value = target.innerText;
    this.setState({
      activePage: Number(value),
    });
  };

  getTagRelatedArticles = ({ target }) => {
    const value = target.innerText;
    this.setState({
      activeTab: value,
    });
  };

  emptyTab = () => {
    this.setState({
      activeTab: "",
    });
  };

  render() {
    let { articles, error, totalArticles, activePage, activeTab } = this.state;
    return (
      <section className="hero">
        <Bannar />
        <div className="content-container flex-row">
          <div className="articles-container">
            <FeedNav activeTab={activeTab} emptyTab={this.emptyTab} />
            <Posts data={articles} error={error} />
            <Pagination
              totalArticles={totalArticles}
              activePage={activePage}
              nextPage={this.getNextPage}
            />
          </div>
          <Sidebar getTagArticles={this.getTagRelatedArticles} />
        </div>
      </section>
    );
  }
}
