import React, { Component } from "react";

export default class NewPost extends Component {

  state = {
    title: "",
    description: "",
    body: "",
    tags: "",
    errors: {
      title: "",
      description: "",
      body: "",
      tags: "",
    },
  };

  handleChange=({target})=>{
    const {name , value}  = target;
    this.setState({
    [name] : value
    })
  }

  render() {
    return (
      <section className="newpost-container">
        <form className="post-container">
          <div className="form-group">
            <input
              placeholder="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <span className="error"></span>
          </div>
          <div className="form-group">
            <input
              placeholder="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <span className="error"></span>
          </div>
          <div className="form-group">
            <textarea
              placeholder="body"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
            <span className="error"></span>
          </div>
          <div className="form-group">
            <input
              placeholder="tags"
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
            />
            <span className="error"></span>
          </div>
        </form>
      </section>
    );
  }
}
