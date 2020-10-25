import React from "react";
import "./Comment.scss";

const Comment = ({ postImg, userImg, username }) => {
  return (
    <div className="comment-container">
      <div className="post-img">
        <img src={postImg} alt="Post Image" />
      </div>
      <div className="comment-box">
        <div className="box-head">
          <div className="user-img">
            <img src={userImg} alt="user image" />
          </div>
          <div className="username">{username}</div>
        </div>
        <div className="comment-content">
          Altså... Svein Krogstad Remi? 😂🙋🏼‍♀️👏🏼🤩 Antibac er en slager.. men...nå
          skjønner jeg enda mer «antibac-regimet» deres på kontoret😂🤷🏼‍♀️
        </div>
      </div>
    </div>
  );
};

export default Comment;
