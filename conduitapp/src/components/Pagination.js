import React from "react";

export default function Pagination(props) {
  let { totalArticles, activePage, nextPage } = props;
  let totalPages = Math.ceil(totalArticles / 10);
  let pagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }
  return (
    <>
      <div className="pagination-container">
        {pagesArray.map((page) => {
          return (
            <span
              className={activePage === page ? "active" : ""}
              key={page}
              onClick={nextPage}
            >
              {page}
            </span>
          );
        })}
      </div>
    </>
  );
}