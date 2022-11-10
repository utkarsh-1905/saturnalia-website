import React, { useEffect, useState} from "react";
import styles from "./events.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import EventCard from '../../components/events-card/EventCard';
import axios from "axios";

const Events = () => {

  const [events, setEvents] = useState(null);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios.get("https://api.saturnaliatiet.com/event/all/", headers).then((res) => {
      setEvents(res.data);
    }).catch((err) => {
      console.log(err);
    }); 
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.eventHeading}>EVENTS</h1>
      <div className={styles.groundmesh}></div>
      <div className={styles.swiperContainer}>
        <Swiper spaceBetween={50} slidesPerView={3}>
          {events && events.map((event) => {
            return(
              <SwiperSlide>
                <EventCard event={event} />
              </SwiperSlide>
            )
            })
          } 
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
