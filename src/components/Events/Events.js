import React from "react";
import styles from "./events.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";

const Events = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.eventHeading}>EVENTS</h1>
      <div className={styles.groundmesh}></div>
      <div className={styles.swiperContainer}>
        <Swiper spaceBetween={50} slidesPerView={3}>
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
