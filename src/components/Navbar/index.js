import React, { useEffect, useState } from "react";
import navStyles from "./navstyles.module.css";
import { Sling as Hamburger } from "hamburger-react";
import NewForm from "../Forms/newform";
import { useMediaQuery } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import {HashLink} from 'react-router-hash-link';

export default function Navbar() {
  // const isMobileView = useMediaQuery("max-width: 768px");
  const [cookie, setCookie] = useCookies(["authToken"]);

  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobileView(true);
    }
  }, []);
  return (
    <div className={navStyles.footer}>
      {!isMobileView ? (
        <div className={[navStyles.navbar]}>
          <div className={navStyles.navLeft}>
            <Link className={navStyles.navlink} to="/">
              Home
            </Link>
            <HashLink className={navStyles.navlink} to="/#events">
              Events
            </HashLink>
            <HashLink className={navStyles.navlink} to="/#highlights">
              Features
            </HashLink>
          </div>
          <div className={navStyles.buttonTray}>
            {!cookie?.authToken ? (
              <button
                className={navStyles.loginButton}
                onClick={() => setOpenModal(true)}
              >
                <em>SIGN UP</em>
              </button>
            ) : (
              <button className={navStyles.loginButton}>
                <Link to="/dashboard">
                  <em style={{ fontSize: "x-large" }}>Dashboard</em>
                </Link>
              </button>
            )}
          </div>
          <div className={navStyles.navRight}>
            <HashLink className={navStyles.navlink} to="/#sponsor">
              Sponsors
            </HashLink>
            <HashLink className={navStyles.navlink} to="/#landing">
              FAQS
            </HashLink>
            <HashLink className={navStyles.navlink} to="/#contact-us">
              Contact Us
            </HashLink>
          </div>
        </div>
      ) : (
        <>
          <div className={navStyles.navToggleButton}>
            <Hamburger color="#ffffff" toggled={isOpen} toggle={setIsOpen} />
          </div>
          {isOpen && (
            <div className={navStyles.navbar}>
              <div className={navStyles.navLeft}>
                <Link className={navStyles.navlink} to="/dashboard">
                  <em>Explore</em>
                </Link>
                <Link className={navStyles.navlink} to="/">
                  Home
                </Link>
                <HashLink className={navStyles.navlink} to="/#events">
                  Events
                </HashLink>
                <HashLink className={navStyles.navlink} to="/#highlights">
                  Features
                </HashLink>
                <HashLink className={navStyles.navlink} to="/#sponsors">
                  Sponsors
                </HashLink>
                <HashLink className={navStyles.navlink} to="/#landing">
                  FAQS
                </HashLink>
                <HashLink className={navStyles.navlink} to="/#contact-us">
                  Contact Us
                </HashLink>
              </div>
            </div>
          )}
        </>
      )}
      <NewForm open={openModal} close={setOpenModal} />
    </div>
  );
}
