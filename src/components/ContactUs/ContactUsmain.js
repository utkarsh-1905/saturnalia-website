import React, { useEffect, useState } from 'react'
import ContactUs from './ContactUs'
import './Contactusmain.css'
//importing image:
import Bhoot from '../../assets/bhoot.png'

const ContactUsmain = () => {
  const [width,setWidth]=useState();

  useEffect(()=>{
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  },[window.innerWidth])

  return (
    <div className='container-contact'>
    <h1 className='eventHeading'>Contact Us</h1>
<div className='main'>
  <div className='img-contain'>
  <img className='bhoot-svg' src={Bhoot}/>
  </div>
    <div className='main-contact-form'>
    <ContactUs/>  
    </div> 

</div>
    </div>
  )
}

export default ContactUsmain