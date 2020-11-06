import React from "react";
import "./Feed.scss";

//Assets
import CommentImage from "../../assets/img/comment.svg";
import HeartImage from "../../assets/img/heart.svg";

const Feed = ({ post }) => {
  let { caption, commentsCount, imageUrl, likesCount } = post;
  return (
    <div className="feed-container">
      <div className="reactions-box">
        <div className="heart-img">
          <div className="likes">{likesCount}</div>
          <img src={HeartImage} alt="Likes" />
        </div>
        <div className="comment-img">
          <div className="comments">{commentsCount}</div>
          <img src={CommentImage} alt="Comments" />
        </div>
      </div>
      <div className="feed-box">
        <div className="feed-img">
          <img src={imageUrl} alt="Post Pic"/>
        </div>
        <div className="feed-content">
         {caption.trim()}
        </div>
      </div>
    </div>
  );
};

export default Feed;
