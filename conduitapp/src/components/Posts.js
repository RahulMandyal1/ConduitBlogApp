import React from "react";
import Post from "./Post";
import Loader from "./Loader";

export default function Posts(props) {
<<<<<<< Updated upstream
  let {articles , error} = props;
=======
  let { data, error } = props;

>>>>>>> Stashed changes
  //if an error has occured while fetching show this  error
  if(error){
      return <h3 className="text-center">{error}</h3>
  }

  //   if there is no articles then loader will be shown
  if (!articles) {
    return <Loader />;
  }
<<<<<<< Updated upstream
=======

  // if no articles found but the respose is coming from server
  if (data.articles.length === 0) {
    return <h4 className="text-center">No Result found !!</h4>;
  }

>>>>>>> Stashed changes
  return (
    <div className="articles-container">
      {articles.articles.map((article) => {
        return <Post article={article} key={article.slug} />;
      })}
    </div>
  );
}

