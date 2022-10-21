import React from 'react'
import './Card.css'
import DiamondIcon from '@mui/icons-material/Diamond';
const Card = () => {
  return (
    <div>
        <div className='card-container'>
            <div className='card'>
            <div className='card-icon'>
                <DiamondIcon className='icon-inside' style={{color:'white',fontSize:'100px'}}/>
            </div>
            <div className='card-content'>
                <h2>Card One</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aperiam dicta consequuntur sapiente facere tempore quis dolores aliquam culpa inventore. Velit minima expedita eum magni illo sint dicta fugit! Dignissimos!</p>
            </div>
            </div>
            <div className='card'>
            <div className='card-icon'>
                <DiamondIcon className='icon-inside' style={{color:'white',fontSize:'100px'}}/>
            </div>
            <div className='card-content'>
                <h2>Card Two</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aperiam dicta consequuntur sapiente facere tempore quis dolores aliquam culpa inventore. Velit minima expedita eum magni illo sint dicta fugit! Dignissimos!</p>
            </div>
            </div>
            <div className='card'>
            <div className='card-icon'>
                <DiamondIcon className='icon-inside' style={{color:'white',fontSize:'100px'}}/>
            </div>
            <div className='card-content'>
                <h2>Card Three</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aperiam dicta consequuntur sapiente facere tempore quis dolores aliquam culpa inventore. Velit minima expedita eum magni illo sint dicta fugit! Dignissimos!</p>
            </div>
            </div> 
        </div>
    </div>
  )
}

export default Card