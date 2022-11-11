import React from "react";
import "./Backdrop.scss";
import Stars from "../Stars/Stars";

const Backdrop = (props) => {
  return (
    <>
      <div className="backdrop-container">
        <div className="backdrop">
          <Stars />
          <div className="color-1"></div>
          <div className="color-2"></div>
          <div className="color-3"></div>
        </div>
      </div>
      <div className="children">{props.children}</div>
    </>
  );
};

export default Backdrop;
