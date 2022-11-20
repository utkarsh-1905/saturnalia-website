import React, { useEffect,useState } from 'react'
import img1 from './images/back.jpeg'
import SplitImage from './SplitImage'

import'./newhighlights.css'

const Highlights = () => {
  
  // const images=[
  //   {
  //     img1:"./highlights/back.jpeg"
  //   }
  // ]
  // useEffect(()=>{
  // console.log(window.innerWidth,window.innerHeight);
  // },[])

  return (
    <div className='container'>    
   
    <div className='left-highlight'>
    {/* <img className='image-highlight' src={img1}/> */}
    <SplitImage/>
    </div>


    <div className='right-highlight'>
    <h1 className='eventHead'>HIGHLIGHTS</h1>
    <p className='highlight-content'>This years' guests include some of the most popular artists from across the country. This collaboration is super exciting for all of us as we prepare to deliver some of the most phenomenal performances that Saturnalia has ever experienced.</p>
    </div>
   
    </div>
  )
}

export default Highlights