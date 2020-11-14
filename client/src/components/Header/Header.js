import React, { useState, useEffect } from "react";
import "./Header.scss";

const Header = ({ username, followers, profilePic, postsCount }) => {
  return (
    <div className="header-container">
      <div className="followers">
        <div>Followers</div>
        <div>{followers}</div>
      </div>
      <div className="user">
        <div className="logo">
          <img src={`${profilePic}`} alt="Logo" />
        </div>
        <div className="username">{username}</div>
      </div>
      <div className="posts">
        <div>Posts</div>
        <div>{postsCount}</div>
      </div>
    </div>
  );
};

export default Header;
