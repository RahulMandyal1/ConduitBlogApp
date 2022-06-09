import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import CreateComment from "./CreateComment";
import Loader from "./Loader";
import Comment from "./Comment";
import { localStorageKey } from "../utils/constant";
import withRouter from "../utils/withRouter";
const token = localStorage[localStorageKey];

class Comments extends Component {
  state = {
    comments: null,
    articleSlug: this.props.articleUrl,
    body: "",
    commentcreated: false,
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const slug = this.state.articleSlug;
    fetch(articlesURL + `/${slug}/comments`)
      .then((res) => res.json())
      .then(({ comments }) => {
        this.setState({
          comments: comments,
        });
      });
  };

  createComment = (event) => {
    event.preventDefault();
    const reverseState = this.state.commentcreated;
    const slug = this.state.articleSlug;
    fetch(`${articlesURL}/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify({ comment: { body: this.state.body } }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState(
          {
            commentcreated: !reverseState,
          },
          this.getComments
        );
      });
  };

  deleteComment = (event, id) => {
    event.preventDefault();
    const reverseState = this.state.commentcreated;
    const slug = this.state.articleSlug;
    fetch(`${articlesURL}/${slug}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.getComments();
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const currentUser = this.props.currentUser;
    if (!this.props.currentUser) {
      if (!this.state.comments) {
        return <Loader />;
      }
      return (
        <>
          {this.state.comments.map((comment) => (
            <Comment
              comment={comment}
              deleteComment={this.deleteComment}
              currentUser={undefined}
            />
          ))}
        </>
      );
    }
    if (this.state.comments === null) {
      return <Loader />;
    }
    if (this.state.comments.length === 0) {
      return (
        <CreateComment
          currentUser={currentUser}
          createComment={this.createComment}
          handleChange={this.handleChange}
          body={this.state.body}
        />
      );
    }
    return (
      <>
        <CreateComment
          currentUser={currentUser}
          createComment={this.createComment}
          handleChange={this.handleChange}
          body={this.state.body}
        />
        {this.state.comments.map((comment) => (
          <Comment
            comment={comment}
            deleteComment={this.deleteComment}
            currentUser={this.props.currentUser}
          />
        ))}
      </>
    );
  }
}

export default withRouter(Comments);
