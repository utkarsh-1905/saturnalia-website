import React, { useEffect, useState } from "react";
import contentStyles from "./styles/Content.module.css";
import logo from "./assets/logo.svg";
import navStyles from "../../components/Navbar/navstyles.module.css";
import Stars from "../../components/Stars/Stars";
import NewForm from "../../components/Forms/newform";
export default function Landing() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileView(true);
    }
  }, []);
  return (
    <>
      {/* <Stars /> */}
      {/* <div className={backgroundStyles.background}></div> */}
      <div className={contentStyles.contentBody}>
        {/* <div className={contentStyles.backdrop}>
          <Stars />
        </div> */}
        <div className={contentStyles.content}>
          {/* Hero Logo */}
          <img src={logo} alt="logo" className={contentStyles.logo} />
          {/* Register now button (more can be added) */}
        </div>
        {isMobileView && (
          <div className={contentStyles.buttonTray}>
            <button
              className={navStyles.loginButton}
              onClick={() => setOpenModal(true)}
            >
              <em>LOG IN</em>
            </button>
          </div>
        )}
        <NewForm open={openModal} close={setOpenModal} />
      </div>
    </>
  );
}
