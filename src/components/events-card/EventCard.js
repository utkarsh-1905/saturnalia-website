import React from 'react'
import './EventCard.css'
//Importing Icons rfom material-UI:
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventCard = () => {
  return (
    <div>
        <div className='event-card-container'>
            <div className='active-button-div'>
               <button className='active-button'>Active</button> 
            </div>
            <div className='event-img-div'>
                {/*Image Here */}
            </div>
            <div className='event-name'>
                <h1>Event Name</h1>
                <p className='event-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
            </div>
            <div className='event-date-and-register'>
                <div className='event-dates-venue'>
                    <h4 className='event-card-date'><CalendarMonthIcon className='event-card-icons' /> 19th Oct</h4>
                    <h4 className='event-card-time' ><WatchLaterIcon className='event-card-icons' /> 4:00 AM</h4>
                    <h4 className='event-card-location' ><LocationOnIcon className='event-card-icons' /> Venue</h4>
                 

                </div>
                <div className='event-card-button-div'>
                    <button className='card-event-register'>Register Now</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventCard