import React, { useState, useEffect } from "react";
import "./App.scss";
import { SOCKET_URL } from "./config";
import io from "socket.io-client";

//Components
import Feed from "./components/Feed/Feed";
import Comment from "./components/Comment/Comment";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";

//Init Socket
const socket = io(SOCKET_URL);

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //Getting data on startup & handle receiving data
  useEffect(() => {
    //Emit get-data on connect
    socket.on("connect", () => {
      socket.emit("get-data");
      socket.emit("refresh-data");
    });

    //Send refresh-data event every 60s
    setInterval(() => socket.emit("refresh-data"), 60 * 1000);

    //Handle loading socket
    socket.on("loading", () => console.log("Loading Data..."));

    //Handle received data
    socket.on("receive-data", (data) => {
      console.log("New Data Received");
      setIsLoading(false);
      setData(data);
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Loading visible={isLoading} />
      <div className="app-container">
        <Header
          username={data.username && data.username}
          followers={data.followers && data.followers}
          profilePic={data.profilePic && data.profilePic}
          postsCount={data.postsCount && data.postsCount}
        />
        <header>
          <div className="new-comments-head">New Comments</div>
          <div className="feed-head">Feed</div>
        </header>

        <div className="app-body">
          <div className="feeds-container">
            {data.posts &&
              data.posts.map((post, i) => (
                <div className="feed-wrapper" key={i}>
                  <div className="comments-container">
                    {post.comments &&
                      post.comments.map((comment, i) => (
                        <Comment comment={comment} key={i} />
                      ))}
                  </div>
                  <div className="feed-holder">
                    <Feed post={post} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
