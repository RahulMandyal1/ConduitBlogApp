import React from 'react'

<<<<<<< Updated upstream
export default function Pagination() {
  return <>
      <div className='pagination-container'>
          
=======
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
              className={activePage === page ? "activepage" : ""}
              key={page}
              onClick={nextPage}
            >
              {page}
            </span>
          );
        })}
>>>>>>> Stashed changes
      </div>
  </>
}
