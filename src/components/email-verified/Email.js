import React from 'react'
import logo from '../../assets/logo.svg'
import './Email.css'
const Email = () => {
  return (
    <div className='email-main'>
        <h1>
        {/* Saturnalia */}
        </h1>
        <img className='sat-logo' src={logo}/>
        <h2 className='email-text'>Your Email has been verified successfully</h2>
        <button className='home-button'>Home Page</button>
    </div>
  )
}

export default Email