import React from "react";
import "./EventCard.css";
//Importing Icons rfom material-UI:
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

const EventCard = ({ event }) => {
  console.log(event);
  const register = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token fda851cb2f548d07d40f82ded3d93e6ad05a8239",
    };
    axios
      .post(
        "https://api.saturnaliatiet.com/event/register/",
        {
          event_id: event.id,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("You need to login first to register for this event!");
      });
  };
  const openModal = () => {};
  return (
    <div>
      <div className="event-card-container">
        <div className="active-button-div">
          {/* <button className='active-button'>{event.is_active ? "Active" : "Inactive"}</button>  */}
          {event.is_active ? (
            <button className="active-button">Active</button>
          ) : (
            <button className="inactive-button">TBA</button>
          )}
        </div>
        <div className="event-img-div">
          <img src={event.image} className="event-image" />
        </div>
        <div className="event-name">
          <h1>{event.name}</h1>
          <p className="event-content">
            {event.description.substring(0, 100)}...
            <a style={{ cursor: "pointer" }} onClick={openModal}>
              more
            </a>
          </p>
        </div>
        <div className="event-date-and-register">
          <div className="event-dates-venue">
            <h4 className="event-card-date">
              <CalendarMonthIcon className="event-card-icons" />{" "}
              {event.date ? event.date : "TBA"}
            </h4>
            <h4 className="event-card-time">
              <WatchLaterIcon className="event-card-icons" />
              {event.time ? event.time : "TBA"}
            </h4>
            <h4 className="event-card-location">
              <LocationOnIcon className="event-card-icons" />
              {event.venue ? event.venue : "TBA"}
            </h4>
          </div>
          <div className="event-card-button-div">
            {event.registration_allowed && (
              <button className="card-event-register" onClick={register}>
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
