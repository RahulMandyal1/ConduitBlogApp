import React from "react";
export default function FeedNav(props) {
  return (
    <div className="user-feed-container">
      <ul>
        <li className={props.feed === "/feed" ? "active-feed" : ""}>
          Local feed
        </li>
        <li className={props.feed === "/articles" ? "active-feed" : ""}>
          Global feed
        </li>
      </ul>
    </div>
  );
}
