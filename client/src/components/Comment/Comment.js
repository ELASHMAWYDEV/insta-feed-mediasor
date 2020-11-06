import React from "react";
import "./Comment.scss";

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <div className="comment-box">
        <div className="box-head">
          <div className="user-img">
            <img
              src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`}
              alt="user image"
            />
          </div>
          <div className="username">username</div>
        </div>
        <div className="comment-content">
          Altså... Svein Krogstad Remi? 😂🙋🏼‍♀️👏🏼🤩 Antibac er en slager.. men...nå
          skjønner jeg enda mer «antibac-regimet» deres på kontoret😂🤷🏼‍♀️
        </div>
      </div>
      <div className="reply-box">
        <div className="box-head reply-head">
          <div className="user-img">
            <img
              src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`}
              alt="user image"
            />
          </div>
          <div className="username">username</div>
        </div>
        <div className="reply-content">
          Altså... Svein Krogstad Remi? 😂🙋🏼‍♀️👏🏼🤩 Antibac er en slager.. men...nå
          skjønner jeg enda mer «antibac-regimet» deres på kontoret😂🤷🏼‍♀️
        </div>
      </div>
    </div>
  );
};

export default Comment;
