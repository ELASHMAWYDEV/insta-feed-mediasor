import React, { useState, useEffect } from "react";
import "./Feed.scss";

//Assets
import CommentImage from "../../assets/img/comment.svg";
import HeartImage from "../../assets/img/heart.svg";

const Feed = ({imgSrc}) => {
  return (
    <div className="feed-container">
      <div className="reactions-box">
        <div className="heart-img">
          <div className="likes">84</div>
          <img src={HeartImage} alt="Likes" />
        </div>
        <div className="comment-img">
          <div className="comments">10</div>
          <img src={CommentImage} alt="Comments" />
        </div>
      </div>
      <div className="feed-box">
        <div className="feed-img">
          <img src={imgSrc}/>
        </div>
        <div className="feed-content">
          Perfeksjonisten i deg har lyst å trekke pusten dypt og gi gass på alle
          plattformer: Facebook, Instagram, Snapchat, TikTok, Messenger,
          Pinterest, LinkedIn, Byte, Twitter ✌🏻 Er det realistisk? Nei 🤭 Men du
          har kjent på jaget? Oh yes 😭….
        </div>
      </div>
    </div>
  );
};

export default Feed;
