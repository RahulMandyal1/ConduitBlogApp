import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import dateToNormal from "../utils/helper";

export default function Comment(props) {
  const comment = props.comment;
  const currentUser = props.currentUser;

  return (
    <div className="userinput-container usercomment-container">
      <div className="form-group">{comment.body}</div>
      <div className="userprofile-container flex-row-center">
        <figure className="flex-row-center">
          <img
            src={
              comment.author.image
                ? comment.author.image
                : "/images/smiley-cyrus.jpg"
            }
            alt="userprofile"
          ></img>
          <span className="username">
            <Link to={`/profile/${comment.author.username}`}>
              {comment.author.username}
            </Link>
          </span>
          <span> {dateToNormal(comment.createdAt)}</span>
        </figure>
        {currentUser && comment.author.username === currentUser.username && (
          <button
            className="delete"
            onClick={(event) => {
              props.deleteComment(event, comment.id);
            }}
            name="delete"
          >
            <AiFillDelete />
          </button>
        )}
      </div>
    </div>
  );
}
