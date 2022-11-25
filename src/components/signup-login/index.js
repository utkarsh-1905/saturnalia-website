import Image from '../../assets/login-signup.png'
import React from 'react'
import './Signuplogin.css'

const index = () => {
  return (

<div className='signup-login-container'>

<div className='login-signup-main'>

<div className='left-div-sign'>
<h1 className='signHeading'>SIGN UP / LOGIN TO REGISTER FOR EVENTS</h1>
</div>

<div className='right-div-sign'>
<img className='image-signup' src={Image} />
</div>

</div>

</div>

  )
}

export default index
