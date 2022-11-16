import React, { useEffect, useState } from "react";
import styles from "./events.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Scrollbar, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import EventCard from "../../components/events-card/EventCard";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

const Events = () => {
  const md = useMediaQuery("max-width:768px");
  const sm = useMediaQuery("max-width:576px");
  const [events, setEvents] = useState(null);
  const [ev, setEv] = useState(true);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get("https://api.saturnaliatiet.com/event/all/", headers)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.eventHeading}>
        <div className={styles.eventBox}>
          <span
            onClick={() => {
              setEv(true);
            }}
            className={ev ? styles.active : styles.inactive}
          >
            EVENTS
          </span>{" "}
          <span
            onClick={() => setEv(false)}
            className={!ev ? styles.active : styles.inactive}
          >
            COMPETITONS
          </span>
        </div>
      </div>
      {/* <div className={styles.groundmesh}></div> */}
      <div className={styles.swiperContainer}>
        <Swiper
          spaceBetween={40}
          slidesPerView={() => {
            if (sm) {
              return 1;
            } else if (md) {
              return 2;
            } else return 3;
          }}
          modules={[Autoplay, Keyboard, Navigation, Scrollbar, Pagination]}
          navigation
          scrollbar={{ draggable: true }}
          pagination={true}
          autoplay={{ delay: 2500 }}
          keyboard
        >
          {events &&
            events.map((event) => {
              if (ev && event.type == "EV") {
                return (
                  <SwiperSlide>
                    <EventCard event={event} />
                  </SwiperSlide>
                );
              } else if (!ev && event.type == "CP") {
                return (
                  <SwiperSlide>
                    <EventCard event={event} />
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
