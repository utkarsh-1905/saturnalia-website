import React, { useEffect, useState } from 'react'
import navStyles from './navstyles.module.css'
import {Sling as Hamburger} from 'hamburger-react'

export default function Navbar() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if(window.innerWidth <= 768){
        setIsMobileView(true);
    }
  }, []);
  return (
    <div className={navStyles.footer}>
        {(!isMobileView)?(<div className={[navStyles.navbar]}>
            <div className={navStyles.navLeft}>
                <a className={navStyles.navlink} href="">Home</a>
                <a className={navStyles.navlink} href="">Events</a>
                <a className={navStyles.navlink} href="">Features</a>
            </div>
            <div className={navStyles.buttonTray}>
                <button
                    className={navStyles.loginButton}
                >
                    <em>Coming Soon</em>
                </button>
            </div>
            <div className={navStyles.navRight}>
                <a className={navStyles.navlink} href="">Sponsors</a>
                <a className={navStyles.navlink} href="">FAQS</a>
                <a className={navStyles.navlink} href="">Contact Us</a>
            </div>
        </div>):(
            <>
                <div className={navStyles.navToggleButton}>
                    <Hamburger 
                        color='#ffffff' 
                        toggled={isOpen}
                        toggle={setIsOpen}
                    />
                </div>
                {
                    (isOpen) && (
                        <div className={navStyles.navbar}>
                            <div className={navStyles.navLeft}>
                                <a className={navStyles.navlink} href="">Home</a>
                                <a className={navStyles.navlink} href="">Events</a>
                                <a className={navStyles.navlink} href="">Features</a>
                                <a className={navStyles.navlink} href="">Sponsors</a>
                                <a className={navStyles.navlink} href="">FAQS</a>
                                <a className={navStyles.navlink} href="">Contact Us</a>
                            </div> 
                        </div>
                    )
                }
            </>
        )}
    </div>
  )
}
