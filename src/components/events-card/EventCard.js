import React from 'react'
import './EventCard.css'
//Importing Icons rfom material-UI:
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventCard = ({event}) => {
  console.log(event);
  return (
    <div>
        <div className='event-card-container'>
            <div className='active-button-div'>
               {/* <button className='active-button'>{event.is_active ? "Active" : "Inactive"}</button>  */}
               {event.is_active ? (
                    <button className='active-button'>Active</button>
               ):(
                    <button className='inactive-button'>Inactive</button>
               )}
            </div>
            <div className='event-img-div'>
                {/*Image Here */}
            </div>
            <div className='event-name'>
                <h1>{event.name}</h1>
                <p className='event-content'>
                    {event.description.substring(0, 100)}...<a>more</a>
                </p>
            </div>
            <div className='event-date-and-register'>
                <div className='event-dates-venue'>
                    <h4 className='event-card-date'><CalendarMonthIcon className='event-card-icons' /> {event.date ? event.date : "TBA"}</h4>
                    <h4 className='event-card-time' ><WatchLaterIcon className='event-card-icons' />{event.time ? event.time : "TBA"}</h4>
                    <h4 className='event-card-location' ><LocationOnIcon className='event-card-icons' /> Venue : {event.venue ? event.venue : "TBA"}</h4>
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