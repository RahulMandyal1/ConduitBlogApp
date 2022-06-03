import React, { Component } from "react";
import { tagsURL } from "../utils/constant";
import Loader from "./Loader";
import { Link } from "react-router-dom";
export default class Sidebar extends Component {
  state = {
    tagsData: null,
    error: "",
  };

  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((alltags) => {
        this.setState({
          tagsData: alltags,
        });
      })
      .catch((error) => {
        this.setState({
          error: "something went wrong not able to fetch",
        });
      });
  }

  render() {
    let { tagsData, error } = this.state;
    // if there is an error while fetching
    if (error) {
      return <h4 className="text-center">{error}</h4>;
    }
    return (
      <div className="sidebar-container">
        <h4>Popular tags</h4>
        {tagsData === null ? (
          <Loader />
        ) : (
          <ul className="tags-container">
            {tagsData.tags.map((tag) => {
              return (
                <li key={tag}>
                  <Link to="/tags">{tag}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
