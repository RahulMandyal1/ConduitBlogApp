import React from "react";
import Post from "./Post";
import Loader from "./Loader";
export default function Posts(props) {
  let {articles , error} = props;
  //if an error has occured while fetching show this  error
  if(error){
      return <h3 className="text-center">{error}</h3>
  }
  //   if there is no articles then loader will be shown
  if (!articles) {
    return <Loader />;
  }
  return (
    <div className="articles-container">
      {articles.articles.map((article) => {
        return <Post article={article} key={article.slug} />;
      })}
    </div>
  );
}
