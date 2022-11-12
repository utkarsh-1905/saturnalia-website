import React, { useEffect, useState } from 'react'
import ContactUs from './ContactUs'
//importing image:
import Bhoot from '../../assets/bhoot.svg'

const ContactUsmain = () => {
  const [height,setHeight]=useState();

  useEffect(()=>{
    if(window.innerWidth>1000 && window.innerWidth<1920){
      setHeight(700);
    }
    // if(window.innerWidth>1000){
    //   setHeight(500);
    // }
  },[window.innerWidth])
  

  return (
    <div className='container'>
<div className='main'>

    <img height={height} className='bhoot-svg' src={Bhoot}/>
    <ContactUs/>   

</div>
    </div>
  )
}

export default ContactUsmain