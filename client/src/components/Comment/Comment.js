import React from "react";
import "./Comment.scss";

const Comment = ({ comment }) => {
  let { text, username, imageUrl, replies } = comment;

  return (
    <div className="comment-container">
      <div className="comment-box">
        <div className="box-head">
          <div className="user-img">
            <img src={imageUrl} alt="User Pic" />
          </div>
          <div className="username">{username}</div>
        </div>
        <div className="comment-content">{text}</div>
      </div>
      <div className="replies-container">
        {replies &&
          replies.map((reply, i) => (
            <div className="reply-box" key={i}>
              <div className="box-head reply-head">
                <div className="user-img">
                  <img src={reply.imageUrl} alt="User Pic" />
                </div>
                <div className="username">{reply.username}</div>
              </div>
              <div className="reply-content">{reply.text}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
