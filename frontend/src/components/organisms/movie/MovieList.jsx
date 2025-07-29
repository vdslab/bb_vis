import React, { memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieListItem from "./MovieListItem";

const MovieList = memo(({ iframeTags, width, height }) => {
  // 安定したキーを生成
  const slidesWithKeys = useMemo(() => {
    return iframeTags.map((iframeTag, index) => ({
      iframeTag,
      key: `movie-${index}-${iframeTag?.slice(0, 50)?.replace(/[^a-zA-Z0-9]/g, "") || index}`,
    }));
  }, [iframeTags]);

  return (
    <div className="movie-list">
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
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
        {slidesWithKeys.map(({ iframeTag, key }) => (
          <SwiperSlide key={key}>
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
});

MovieList.displayName = "MovieList";

export default MovieList;
