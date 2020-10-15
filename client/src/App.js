import React from 'react';
import './App.scss';



//Components
import Feed from "./components/Feed/Feed";


const App = () => {
  return (
    <div className="app-container">
      <header>
        <div className="new-comments-head">New Comments</div>
        <div className="feed-head">Feed</div>
      </header>

      <div className="app-body">
        <div className="comments-container">comments</div>
        <div className="feeds-container">
          <Feed imgSrc={`https://instagram.fcai17-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/119516927_845632519509825_5327947799728453987_n.jpg?_nc_ht=instagram.fcai17-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=FEKAI2nEtxYAX-keNjE&_nc_tp=24&oh=e8ce7165cc3421e6f6d8a29026f93847&oe=5FB25733`}/>
          <Feed imgSrc={`https://instagram.fcai17-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/119222958_628558748034654_7168701339950509168_n.jpg?_nc_ht=instagram.fcai17-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=r8AaS71CtbUAX-9-QAx&_nc_tp=24&oh=9becd57c4f2bf50d0660c23e48c58b8b&oe=5FB1B34A`}/>
          <Feed imgSrc={`https://instagram.fcai17-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/118481520_160759555624281_8597620682981689217_n.jpg?_nc_ht=instagram.fcai17-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=3fTbjMySTfQAX8L1CTZ&_nc_tp=25&oh=f40c0034284184e3028666f5876d3c95&oe=5FB1E7B6`}/>
          <Feed imgSrc={`https://instagram.fcai17-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/117734564_155563872831491_4083708434821887036_n.jpg?_nc_ht=instagram.fcai17-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=TP0hPYgDCQ8AX98f5E0&_nc_tp=24&oh=6240e66e99f57241ea503b36586aaa9e&oe=5FB3F92E`}/>
        </div>
      </div>
    </div>
  );
}

export default App;
