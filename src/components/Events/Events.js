import React from "react";
import styles from "./events.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import EventCard from "../../components/events-card/EventCard";

const Events = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.eventHeading}>EVENTS</h1>
      {/* <div className={styles.groundmesh}></div> */}
      <div className={styles.swiperContainer}>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          modules={[Autoplay]}
          autoplay={true}
        >
          <SwiperSlide className={styles.swiperCard}>
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperCard}>
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperCard}>
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperCard}>
            <EventCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
