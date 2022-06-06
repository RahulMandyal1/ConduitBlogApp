import React from "react";
import Post from "./Post";
import Loader from "./Loader";
export default function Posts(props) {
  let { data, error } = props;
  //if an error has occured while fetching show this  error
  if (error) {
    return <h3 className="text-center">{error}</h3>;
  }
  //   if there is no articles then loader will be shown
  if (!data) {
    return <Loader />;
  }

  // if no articles found but the respose is coming from server
  if(data.articles.length===0){
    return <h4 className="text-center">No Result found !!</h4>
  }
  return (
    <>
      {data.articles.map((article) => {
        return <Post article={article} key={article.slug} />;
      })}
    </>
  );
}
