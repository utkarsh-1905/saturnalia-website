import React from 'react'
import navStyles from './navstyles.module.css'

export default function Navbar() {
  return (
    <div className={navStyles.footer}>
        {/* Navbar */}
        <div className={[navStyles.navbar]}>
            <div className={navStyles.navLeft}>
                <a className={navStyles.navlink} href="">Home</a>
                <a className={navStyles.navlink} href="">Events</a>
                <a className={navStyles.navlink} href="">Features</a>
            </div>
            <div className={navStyles.buttonTray}>
                <button
                    className={navStyles.loginButton}
                >
                    <em>LOG IN</em>
                </button>
            </div>
            <div className={navStyles.navRight}>
                <a className={navStyles.navlink} href="">Sponsors</a>
                <a className={navStyles.navlink} href="">FAQS</a>
                <a className={navStyles.navlink} href="">Contact Us</a>
            </div>
        </div>
    </div>
  )
}
