import React, { useEffect } from 'react'
import person from '../../assets/unkown.jpg'
import'./highlights.css'

const Highlights = () => {

  useEffect(()=>{
  console.log(window.innerWidth,window.innerHeight);
  },[])

  return (
    <div className='container'>    
    <div className='highlights-horizontal-flex'>
    <div className='left-div'>
      <div className='left-div-content'>
        <img className='left-div-content-img' src={person}/>
        </div>
        
    </div>
    <div className='right-div'>
      <div className='right-div-content'>
    <h1 className='eventHeading'>HIGHLIGHTS</h1>
    <p className='highlight-content'>Lorem ipsum dolor sit amet. Ut saepe harum ea voluptatum quos est commodi dolorum aut modi quibusdam eos ipsa dolorum ut accusamus sunt? Est omnis maiores vel delectus ratione et incidunt sequi.

Aut itaque officiis non eligendi praesentium vel iusto mollitia quo quibusdam dolores et similique corrupti ea suscipit dolore ut recusandae praesentium. Hic doloribus nobis eos dignissimos voluptates non ducimus deleniti ut obcaecati ipsum. In omnis unde eum voluptate deleniti in reiciendis dolores aut ullam natus eos possimus obcaecati et excepturi repellendus. In quod asperiores aut dolor ratione aut minima optio qui amet maiores sed voluptatem reiciendis et galisum voluptates non rerum assumenda.</p>
</div>

    </div>
    </div>
    </div>
  )
}

export default Highlights