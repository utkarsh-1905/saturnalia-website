import React from "react";
import "./Backdrop.scss";
import Stars from "../Stars/Stars";

const Backdrop = (props) => {
  return (
    <div className="backdrop-container">
      <Stars />
      <div className="color-1"></div>
      <div className="color-2"></div>
      <div className="color-3"></div>
      <div className="children">{props.children}</div>
    </div>
  );
};

export default Backdrop;
