import React, { Component } from "react";
import { newArticle } from "../utils/constant";
import { notEmpty } from "../utils/validation";
import withRouter from "../utils/withRouter";

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
      tagList: "",
      requiredall: "",
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    // validation for the blog post
    this.setState((previousState) => {
      return {
        ...previousState,
        errors: {
          ...previousState.errors,
          [name]: notEmpty(value, name),
          requiredall: "",
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
    const { title, description, body, tagList } = this.state.article;
    const article = this.state.article;
    article.tagList = article.tagList.split(",");

    // all the fields all required
    if (!title && !description && !body && !tagList) {
      return this.setState({
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
      body: JSON.stringify({ article: article }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("artice is not created ");
        }
        return res.json();
      })
      .then((data) => {
        this.props.navigate("/");
      })
      .catch(({ errors }) => {
        console.log("article is not created");
      });
  };

  render() {
    const { title, description, body, tagList, requiredall } =
      this.state.errors;
    return (
      <section className="form-container container">
        <div className="center user-form">
          <h2 className="section-heading text-center"> Add a new post</h2>
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
                name="tagList"
                value={this.state.article.tagList}
                onChange={this.handleChange}
              />
              <span className="error">{tagList}</span>
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
