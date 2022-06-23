import React, { Component } from "react";
import { articlesURL } from "../utils/constant";
import CreateComment from "./CreateComment";
import Loader from "./Loader";
import Comment from "./Comment";
import { localStorageKey } from "../utils/constant";
import withRouter from "../utils/withRouter";
import { Link } from "react-router-dom";
const token = localStorage[localStorageKey];

class Comments extends Component {
  state = {
    comments: null,
    articleSlug: this.props.articleUrl,
    body: "",
    commentsChange: false,
  };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(_previousProps, previousState) {
    if (previousState.commentsChange !== this.state.commentsChange) {
      this.getComments();
    }
  }

  getComments = () => {
    const slug = this.state.articleSlug;
    fetch(articlesURL + `/${slug}/comments`)
      .then((res) => res.json())
      .then(({ comments }) => {
        this.setState((previousState) => {
          return {
            ...previousState,
            comments: comments,
          };
        });
      });
  };

  createComment = (event) => {
    event.preventDefault();
    const reverseState = this.state.commentsChange;
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
        this.setState({
          commentsChange: !reverseState,
        });
      });
  };

  deleteComment = (_event ,id) => {
    // event.preventDefault();
    const reverseState = this.state.commentsChange;
    const slug = this.state.articleSlug;
    console.log(" this is inside delete");
    fetch(`${articlesURL}/${slug}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        this.setState({
          commentsChange: !reverseState,
        });
      }
      return res.json();
    }).catch((err)=>{
      console.log("there is a error",err);
    })
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
        <p className="text-center notloggedinuser">please <Link to="/register">register</Link> or <Link to="/login">login</Link> to create a comment</p>
          {this.state.comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
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
            key={comment.id}
          />
        ))}
      </>
    );
  }
}

export default withRouter(Comments);
