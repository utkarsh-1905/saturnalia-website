import React from "react";
import styles from "./footer.module.scss";
import Logo from "../../assets/saturnalia-logo.png";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import Youtube from "../../assets/youtube.svg";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
// import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Logo} alt="Saturnalia 2022" />
        {/* <p className={styles.footerInfo}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p> */}
        <div className={styles.logos}>
          <a href="https://www.facebook.com/saturnalia.thapar/?ti=as"><img className="footer-img" src={Facebook} alt="Facebook" /></a>
          <a href="https://instagram.com/saturnalia.thapar?igshid=YmMyMTA2M2Y=" ><img src={Instagram} alt="Instagram" /></a>
          <a><img src={Twitter} alt="Twitter" /></a>
          <a href="https://youtube.com/channel/UCZv84Q5t_ESkpSnNlt5H0lg"><img src={Youtube} alt="Youtube" /></a>
        </div>
      </div>
      <div className={styles.right}>
        <h4>Contact Us</h4>
        <p>Have Queries? Reach out to us anytime! </p>
        <div>
          <p>
            {" "}
            <EmailIcon className={styles.contactIcons} />{" "}
            <a
              href="mailto:saturnalia@thapar.edu"
              style={{ color: "white", textDecoration: "none" }}
            >
              saturnalia@thapar.edu
            </a>{" "}
          </p>
          {/* <p>
            {" "}
            <EmailIcon className={styles.contactIcons} /> xyz@gmail.com{" "}
          </p> */}
          <p>
            {" "}
            <CallIcon className={styles.contactIcons} />{" "}
            <a
              href="tel:8532869741"
              style={{ color: "white", textDecoration: "none" }}
            >
              +91 85328 69741
            </a>
          </p>
          {/* <p>
            {" "}
            <CallIcon className={styles.contactIcons} /> 123456789
          </p> */}
        </div>
        {/* <motion.button
          className={styles.toTop}
          initial={{ y: 0 }}
          whileHover={{ y: -10 }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </motion.button> */}
      </div>
    </div>
  );
};

export default Footer;
