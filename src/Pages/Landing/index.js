import React, { useEffect, useState } from "react";
import contentStyles from "./styles/Content.module.css";
import logo from "./assets/logo.svg";
import navStyles from "../../components/Navbar/navstyles.module.css";
import Stars from "../../components/Stars/Stars";
import NewForm from "../../components/Forms/newform";
import { useMediaQuery } from "@mui/material";
import {Fab} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useCookies } from "react-cookie";

export default function Landing() {
  const [isMobileView, setIsMobileView] = useState(false);
  // const isMobileView = useMediaQuery("max-width: 768px");
  const [openModal, setOpenModal] = useState(false);
  const [cookie, setCookie] = useCookies(["authToken"]);

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
        <Fab
          variant="extended"
          color= "primary"
          size= "medium"
          sx={{ 
            position: "absolute",
            letterSpacing: "0.1em",
            right: "0",
            mt: 2,
            mr: 1,
            "@media (max-width: 768px)": {
              bottom: "40%",
              right: "0",
              position: "absolute",
              letterSpacing: "0.1em",
              mt: 2,
              mr: 1,
              ml: 1,
              fontSize: "0.8rem",
            }
          }}
          onClick={() => {
            document.location.href = "https://forms.gle/4QaGsmcLUThzgwrw5";
          }}
        >
          <InfoOutlinedIcon  sx={{color: "#00FFFb", mr:1}}/>
          Registration for Derabassi Students
        </Fab>
        <div className={contentStyles.content}>
          {/* Hero Logo */}
          <img src={logo} alt="logo" className={contentStyles.logo} />
          {/* Register now button (more can be added) */}
        </div>
        {(isMobileView && !cookie?.authToken) && (
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
