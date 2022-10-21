import React from "react";
import styles from "./footer.module.scss";
import Logo from "../../assets/saturnalia-logo.png";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import Youtube from "../../assets/youtube.svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Logo} alt="Saturnalia 2022" />
        <p className={styles.footerInfo}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <div className={styles.logos}>
          <img src={Facebook} alt="Facebook" />
          <img src={Instagram} alt="Instagram" />
          <img src={Twitter} alt="Twitter" />
          <img src={Youtube} alt="Youtube" />
        </div>
      </div>
      <div className={styles.right}>
        <h4>Contact Us</h4>
        <p>Have Queries? Reach out to use anytime! </p>
        <div>
          <p>
            {" "}
            <EmailIcon className={styles.contactIcons} /> abc@gmail.com{" "}
          </p>
          <p>
            {" "}
            <EmailIcon className={styles.contactIcons} /> xyz@gmail.com{" "}
          </p>
          <p>
            {" "}
            <CallIcon className={styles.contactIcons} /> 123456789
          </p>
          <p>
            {" "}
            <CallIcon className={styles.contactIcons} /> 123456789
          </p>
        </div>
        <motion.button
          className={styles.toTop}
          initial={{ y: 0 }}
          whileHover={{ y: -10 }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </motion.button>
      </div>
    </div>
  );
};

export default Footer;
