import React from "react";
export default function FeedNav(props) {
  const { activeTab, emptyTab } = props;
  return (
    <div className="user-feed-container">
      <ul>
        <li className={activeTab === "" && "active-feed"} onClick={emptyTab}>
          Global feed
        </li>
        {activeTab && (
          <li className={activeTab ? "active-feed" : ""}>#{activeTab}</li>
        )}
      </ul>
    </div>
  );
}