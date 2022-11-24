import React, { useEffect,useState } from 'react'
import img1 from './images/back.jpeg'
import zaeden from './images/zaeden-internet.webp'
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

    <div className='highlights-container'>

    <div className='left-highlight'>
    {/* <img className='image-highlight' src={img1}/> */}
    <SplitImage/>
    </div>

    <div className='right-highlight'>
    <h1 className='eventHead'>HIGHLIGHTS</h1>
    {/* <p className='highlight-content'>This years' guests include some of the most popular artists from across the country. This collaboration is super exciting for all of us as we prepare to deliver some of the most phenomenal performances that Saturnalia has ever experienced.</p> */}
    <p className='highlight-content-artists'>Get ready to have the experience of a lifetime as Christmas comes a tad bit early this year!
      Yes, you heard that right! Saturnalia is ecstatic to announce that the headliner for this year is none other than,*drumroll* Zaeden, The man behind ‘Tere Bina'- the song that broke the charts with over 20 million views on YouTube!
      Experience an unparalleled catalog of melodies that are sure to make you sing your heart out from one of the most charming artists in the industry. This will be a concert that none would like to miss!</p>
    </div>

    </div>
    {/* <div className='artists'>
      <div>
        <img className='zaeden' src={zaeden}></img>
        <h1 className='eventHead'>Zaeden</h1>
      </div>
      <div className='artist-content'>
      <p className='highlight-content-artists'>Get ready to have the experience of a lifetime as Christmas comes a tad bit early this year!
      Yes, you heard that right! Saturnalia is ecstatic to announce that the headliner for this year is none other than,*drumroll* Zaeden, The man behind ‘Tere Bina'- the song that broke the charts with over 20 million views on YouTube!
      Experience an unparalleled catalog of melodies that are sure to make you sing your heart out from one of the most charming artists in the industry. This will be a concert that none would like to miss!</p>
      </div>
    </div> */}

    </div>
    
  )
}

export default Highlights