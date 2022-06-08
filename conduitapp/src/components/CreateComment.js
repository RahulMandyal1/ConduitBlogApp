import React from 'react'
export default function CreateComment(props) {
  const currentUser = props.currentUser;
  return (
    <form className="userinput-container">
            <div className="form-group">
              <textarea
                placeholder="title"
                name="body"
                value={props.body}
                onChange={props.handleChange} 
                rows="3"
                id="no-border"
              />
              <span className="error"></span>
            </div>
            <div className="userprofile-container flex-row-center">
              <figure>
                <img src= {currentUser.image?currentUser.image:"/images/smiley-cyrus.jpg"} alt="userprofile"></img>
              </figure>
              <button className="post-comment-btn" onClick={props.createComment}>post comment</button>
            </div>
          </form>
  )
}
