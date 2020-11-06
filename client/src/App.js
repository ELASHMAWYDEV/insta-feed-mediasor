import React, { useState, useEffect } from "react";
import "./App.scss";
import { SOCKET_URL } from "./config";
import io from "socket.io-client";

//Components
import Feed from "./components/Feed/Feed";
import Comment from "./components/Comment/Comment";
import Loading from "./components/Loading/Loading";

//Init Socket
const socket = io(SOCKET_URL);

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //Getting data on startup & handle receiving data
  useEffect(() => {
    //Get data from api
    socket.emit("get-data");

    //Send refresh-data event every 60s
    setInterval(socket.emit("refresh-data"), 60 * 1000);

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
