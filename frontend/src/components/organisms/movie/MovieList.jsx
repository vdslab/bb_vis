import React, { memo, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import MovieListItem from "./MovieListItem";

const MovieList = memo(({ iframeTags, loading }) => {
  const swiperRef = useRef(null);

  // 安定したキーを生成
  const slidesWithKeys = useMemo(() => {
    return iframeTags.map((iframeTag, index) => ({
      iframeTag,
      key: `movie-${index}-${iframeTag?.slice(0, 50)?.replace(/[^a-zA-Z0-9]/g, "") || index}`,
    }));
  }, [iframeTags]);

  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="movie-list">
      <div className="swiper-container">
        <div className="nav-area nav-area-prev" onClick={handlePrevClick}></div>
        {loading ? <div className="loading">Loading...</div> :
        <Swiper
          ref={swiperRef}
          modules={[Navigation, A11y ,Autoplay]}
          spaceBetween={5}
          slidesPerView="auto"
          navigation={false}
          cssMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {slidesWithKeys.map(({ iframeTag, key }) => (
            <SwiperSlide key={key}>
              <MovieListItem
                iframeTag={iframeTag}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        }
        <div className="nav-area nav-area-next" onClick={handleNextClick}></div>
      </div>
    </div>
  );
});

MovieList.displayName = "MovieList";

export default MovieList;
