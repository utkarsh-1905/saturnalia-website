import React from "react";
import styles from "./sponsorCard.module.scss";

const SponsorCard = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.src} />
      <p>{props.name}</p>
    </div>
  );
};

export default SponsorCard;
