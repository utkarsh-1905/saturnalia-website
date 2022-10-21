import React from "react";
import styles from "./sponsors.module.scss";
import Marquee from "react-fast-marquee";
import SponsorCard from "./SponsorCard/SponsorCard";
import Apple from "../../assets/sponsors/apple.svg";
import Microsoft from "../../assets/sponsors/microsoft.svg";
import Nvidia from "../../assets/sponsors/nvidia.svg";

const Sponsors = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.sponsorsHeading}>Sponsors</h1>
      <div className={styles.sponsorsTicker}>
        <Marquee
          gradient={false}
          speed={200}
          pauseOnHover={true}
          pauseOnClick={true}
          direction="left"
        >
          <SponsorCard src={Apple} name="Apple" />
          <SponsorCard src={Microsoft} name="Microsoft" />
          <SponsorCard src={Nvidia} name="Nvidia" />
        </Marquee>
      </div>
    </div>
  );
};

export default Sponsors;
