import React from "react";
import logo from "../../assets/logo.svg";
import "./Email.css";
import { Link } from "react-router-dom";

const Email = () => {
  return (
    <div className="email-main">
      <img className="sat-logo" src={logo} />
      <h2 className="email-text">Your Email has been verified successfully</h2>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="home-button">Home Page</button>
      </Link>
    </div>
  );
};

export default Email;
