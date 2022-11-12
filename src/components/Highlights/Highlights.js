import React, { useEffect,useState } from 'react'
import'./highlights.css'

const Highlights = () => {
  
  const images=[
    {
      img1:"./highlights/back.jpeg"
    }
  ]
  // useEffect(()=>{
  // console.log(window.innerWidth,window.innerHeight);
  // },[])

  return (
    <div className='container'>    
    <div className='highlights-horizontal-flex'>
    <div className='left-div'>
      <div className='left-div-content'>
        <div className='left-div-content-img'>

        </div>
        </div>
        
    </div>
    <div className='right-div'>
      <div className='right-div-content'>
    <h1 className='eventHeading'>HIGHLIGHTS</h1>
    <p className='highlight-content'>This years' guests include some of the most popular artists from across the country. This collaboration is super exciting for all of us as we prepare to deliver some of the most phenomenal performances that Saturnalia has ever experienced.</p>
</div>

    </div>
    </div>
    </div>
  )
}

export default Highlights