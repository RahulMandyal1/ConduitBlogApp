import React, { Component } from "react";
import { newArticle } from "../utils/constant";
import {notEmpty} from "../utils/validation"
import { withRouter } from "react-router-dom";
class NewPost extends Component {
  state = {
    article: {
      title: "",
      description: "",
      body: "",
      tagList: "",
    },
    errors: {
      title: "",
      description: "",
      body: "",
      tags: "",
      requiredall: "",
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === "tagList") {
      value = value.split().map((tag) => tag.trim());
    }
    // validation for the blog post
    this.setState((previousState) => {
      return {
        ...previousState,
        errors: {
          ...previousState.errors,
          [name]: notEmpty(value, name),
        },
      };
    });

    let articleData = { ...this.state.article };
    articleData[name] = value;
    this.setState({
      article: articleData,
    });
  };

  createArticle = (event) => {
    event.preventDefault();
    const { title, description, body, tags, requiredall } = this.state.errors;
    // all the fields all required
    if ((!title && !description, !body, !tags)) {
      this.setState({
        errors: {
          requiredall: " all fields are required ",
        },
      });
    }

    fetch(newArticle, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify({ article: this.state.article }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("artice is not crated ");
        }
        return res.json();
      })
      .then((data) => {
        this.props.history.push("/");
      })
      .catch(({ errors }) => {
        console.log("article is not created");
      });
  };

  render() {
    const { title, description, body, tags, requiredall } = this.state.errors;
    return (
      <section className="form-container container">
        <div className="center user-form">
          <form className="userinput-container">
            <div className="form-group">
              <input
                placeholder="title"
                name="title"
                value={this.state.article.title}
                onChange={this.handleChange}
              />
              <span className="error">{title}</span>
            </div>
            <div className="form-group">
              <input
                placeholder="description"
                name="description"
                value={this.state.article.description}
                onChange={this.handleChange}
              />
              <span className="error">{description}</span>
            </div>
            <div className="form-group">
              <textarea
                placeholder="body"
                name="body"
                value={this.state.article.body}
                onChange={this.handleChange}
                rows="9"
              />
              <span className="error">{body}</span>
            </div>
            <div className="form-group">
              <input
                placeholder="tags"
                name="tagsList"
                value={this.state.article.tags}
                onChange={this.handleChange}
              />
              <span className="error">{tags}</span>
            </div>

            <div className="form-group allrequired">
              <span className="error">{requiredall}</span>
            </div>

            <div className="flex-end">
              <button className="btn" onClick={this.createArticle}>
                submit
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(NewPost);
