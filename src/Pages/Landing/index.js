import React from 'react'
import backgroundStyles from './styles/Background.module.css'
import contentStyles from './styles/Content.module.css'
import logo from './assets/logo.svg'
import Stars from '../../components/Stars/Stars'

export default function Landing() {
  return (
    <>
        <Stars />
        {/* <div className={backgroundStyles.background}></div> */}
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
        </div>
    </>
  )
}
