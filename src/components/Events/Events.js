import React, { useEffect, useState } from "react";
import styles from "./events.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Scrollbar, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import EventCard from "../../components/events-card/EventCard";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
// import HardCodedData from './Hardcoded'

const Events = () => {
  const md = useMediaQuery("max-width:768px");
  const sm = useMediaQuery("max-width:576px");
  const [events, setEvents] = useState(null);
  const [ev, setEv] = useState(false);
  const [comps,setComps]=useState(true);
  const [x, setX] = useState(3);

  //Hard-coded Competition Card :
  // const [hard,SetHard]=useState(HardCodedData);

  useEffect(() => {
    if(window.innerWidth < 768){
      setX(1)
    }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get("https://api.saturnaliatiet.com/event/all/", headers)
      .then((res) => {
        setEvents(res.data);
        console.log(res.data)
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
              setEv(true) && setComps(false)
            }}
            className={ev ? styles.active : styles.inactive}
          >
            EVENTS
          </span>{" "}
          <span
            onClick={() => setEv(false) && setComps(true) }
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
          slidesPerView={x}
          modules={[Autoplay, Keyboard, Navigation, Scrollbar, Pagination]}
          navigation
          // pagination={{clickable: true}}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 2000 }}
          keyboard
        >
          {/* <EventCard event={HardCodedData} /> */}
          {events &&
            events.map((event) => {
              if (ev && event.type == "EV") {
                console.log("EV", event)
                return (
                  <SwiperSlide>
                    <EventCard event={event} />
                  </SwiperSlide>
                );
              } else if (comps && event.type == "CP") {
                return (
                  <>
                  <SwiperSlide>
                    <EventCard event={event} />
                  </SwiperSlide>
                  </>
                );
              }
            })}
        </Swiper>
        
      </div>
    </div>
  );
};

export default Events;
