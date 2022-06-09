import React from "react";
import { Link } from "react-router-dom";

export default function ProfileBannar(props) {
  let { articleUser, currentUser, isfollowing, followUser, unFollowUser } =props;
  return (
    <div className="profilebannar-container">
      <div className="userprofile-container center">
        <figure>
          <img
            src={
              articleUser.image ? articleUser.image : "/images/smiley-cyrus.jpg"
            }
            alt="userimage"
          ></img>
          <h4 className="username text-center">{articleUser.username}</h4>
        </figure>
      </div>
      <div className="flex-end">
        <UserActions
          articleUser={articleUser}
          currentUser={currentUser}
          isfollowing={isfollowing}
          followUser={followUser}
          unFollowUser={unFollowUser}
        />
      </div>
    </div>
  );
}


function UserActions(props) {
  const articleUser = props.articleUser;
  const currentUser = props.currentUser;
  const username = articleUser.username;

  if (articleUser.username !== currentUser.username) {
    return (
      <button
        className="btn-secondary follow"
        onClick={(event) =>
          props.isfollowing
            ? props.unFollowUser(event, username)
            : props.followUser(event, username)
        }
      >
        {props.isfollowing ? `unfollow ` : `follow `}
        {username}
      </button>
    );
  }

  if (currentUser.username === articleUser.username) {
    return (
      <button className="btn-secondary">
        <Link to="/settings">
        <span>Edit Profile Settings</span>
        </Link>
      </button>
    );
  }
}
