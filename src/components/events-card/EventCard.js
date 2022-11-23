import React from "react";
import "./EventCard.css";
//Importing Icons rfom material-UI:
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useCookies } from "react-cookie";
import TeamRegForm from "../Forms/TeamRegForm";

const EventCard = ({ event }) => {
  const [cookie, setCookie] = useCookies(["authToken"]);
  const [teamModal, showTeamModal] = React.useState(false);
  console.log(event);

  // const gotoDevFolio=()=>{
  //   window.location.href="https://smart-punjab-hackathon-tiet.devfolio.co/";
  // }

  const registerTeam = () => {
    showTeamModal(true);
  }
  const register = () => {
    console.log(cookie.authToken);

    if (cookie.authToken) {
      console.log(event.id);
      var data = new FormData();
      data.append("event", event.id);
      var config = {
        method: "post",
        url: "https://api.saturnaliatiet.com/event/register/",
        headers: {
          Authorization: "Token " + cookie.authToken,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          alert(
            "You have successfully registered for the event! Please check your mail for further details."
          );
        })
        .catch(function (error) {
          alert(error.response.data["error"]);
        });
    } else {
      alert("You need to login first to register for this event!");
    }
  };
  const openModal = () => {};
  return (
    <div>
      <div className="event-card-container">
        <div className="active-button-div">
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
              !event.is_team_event?
                ( event.name === 'Smart Punjab Hackathon' || 'Place-O-Pedia' ?
                (<button className="card-event-register" onClick={()=>{window.open(`${event.redirect_link}`,'_blank')}}>
                  Register Now
                </button>) 
                :
                (<button className="card-event-register" onClick={register}>
                Register Now
              </button>)

                )
                :
                ( event.name === 'Smart Punjab Hackathon' || 'Place-O-Pedia' ? 
                (<button className="card-event-register" onClick={()=>{window.open(`${event.redirect_link}`,'_blank')}}>
                Register/Join Team
              </button>):(
                  <button className="card-event-register" onClick={registerTeam}>
                    Register/Join Team
                  </button>
                )
                )
            )}
          </div>
        </div>
      </div>
      <TeamRegForm open={teamModal} close={showTeamModal} event={event}/>
    </div>
  );
};

export default EventCard;
