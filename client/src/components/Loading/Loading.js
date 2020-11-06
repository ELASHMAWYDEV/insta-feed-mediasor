import React, { useState, useEffect } from "react";
import "./Loading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ visible }) => {
  const [stopLoading, setStopLoading] = useState(false);

  useEffect(() => {
    //To close the loading screen on changing visible prop
    if (visible === false) {
      setTimeout(() => {
        setStopLoading(true);
      }, 400);
    }
  }, [visible]);

  return (
    visible && (
      <div className={`loading-container ${stopLoading && "hide"}`}>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    )
  );
};

Loading.defaultProps = {
  visible: false,
};

export default Loading;
