import React from 'react'
import backgroundStyles from './styles/Background.module.css'
import contentStyles from './styles/Content.module.css'
import logo from './assets/logo.svg'

export default function Landing() {
  return (
    <>
        <div className={backgroundStyles.background}></div>
        <div className={contentStyles.contentBody}>
            <div 
                className={contentStyles.content}
            >
                {/* Hero Logo */}
                <img 
                    src={logo}
                    alt="logo"
                    className={contentStyles.logo} 
                />
                {/* Register now button (more can be added) */}
            </div>
            <div className={contentStyles.footer}>
                {/* Navbar */}
                <div className={[contentStyles.navbar]}>
                    <div className={contentStyles.navLeft}>
                        <a className={contentStyles.navlink} href="">Home</a>
                        <a className={contentStyles.navlink} href="">Events</a>
                        <a className={contentStyles.navlink} href="">Features</a>
                    </div>
                    <div className={contentStyles.buttonTray}>
                        <button
                            className={contentStyles.loginButton}
                        >
                            <em>LOG IN</em>
                        </button>
                    </div>
                    <div className={contentStyles.navRight}>
                        <a className={contentStyles.navlink} href="">Sponsors</a>
                        <a className={contentStyles.navlink} href="">FAQS</a>
                        <a className={contentStyles.navlink} href="">Contant Us</a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
