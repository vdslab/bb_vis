import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieListItem from "./MovieListItem";

const MovieList = ({ iframeTags, width, height }) => {
  return (
    <div className="movie-list">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {iframeTags.map((iframeTag, index) => (
          <SwiperSlide key={index}>
            <MovieListItem
              iframeTag={iframeTag}
              width={width}
              height={height}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
