import React, { Component } from "react";
import { newArticle } from "../utils/constant";
import { notEmpty } from "../utils/validation";
import { articlesURL } from "../utils/constant";
import withRouter from "../utils/withRouter";
import { localStorageKey } from "../utils/constant";
import Loader from "./Loader";
const token = localStorage[localStorageKey];

class UpdateArticle extends Component {
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

  componentDidMount() {
    fetch(articlesURL + `/${this.props.params.slug}`)
      .then((data) => data.json())
      .then(({ article }) => {
        let { title, description, tagList, body } = article;
        this.setState({
          article: {
            title,
            description,
            tagList: tagList.join(","),
            body,
          },
        });
      });
  }

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

  updateArticle = (event) => {
    event.preventDefault();
    const slug = this.props.params.slug;
    fetch(articlesURL + "/" + slug, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: this.state.article }),
    })
      .then((res) => res.json())
      .then(({ article }) => {
        this.props.navigate(`/article/${article.slug}`);
      });
  };

  render() {
    const { title, description, body, tags, requiredall } = this.state.errors;
    if(!this.state.article.title){
      return <Loader/>
    }
    return (
      <section className="form-container container">
        <div className="center user-form">
          <h2 className="section-heading text-center"> Edit post</h2>
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
              <button className="btn" onClick={this.updateArticle}>
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(UpdateArticle);
