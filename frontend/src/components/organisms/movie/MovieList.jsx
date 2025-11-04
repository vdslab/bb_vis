import React, { memo, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, FreeMode } from "swiper/modules"; // ← FreeMode追加！
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/free-mode";
import MovieListItem from "./MovieListItem";

const MovieList = memo(({ iframeTags, loading }) => {
  const swiperRef = useRef(null);

  // 安定したキーを生成
  const slidesWithKeys = useMemo(() => {
    return iframeTags.map((iframeTag, index) => ({
      iframeTag,
      key: `movie-${index}-${
        iframeTag?.slice(0, 50)?.replace(/[^a-zA-Z0-9]/g, "") || index
      }`,
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
      <div className="swiper-container-vertical">
        <div
          className="nav-area-vertical nav-area-prev-vertical"
          onClick={handlePrevClick}
        ></div>

        {/* 読み込み中 */}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : !iframeTags || iframeTags.length === 0 ? (
          /* データがないとき */
          <div className="movie-no-data">No Data</div>
        ) : (
          /* 通常表示 */
          <Swiper
            ref={swiperRef}
            direction="vertical"
            modules={[Mousewheel, Autoplay, FreeMode]}
            freeMode={true}
            spaceBetween={10}
            slidesPerView="auto"
            mousewheel={true}
            speed={400}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            style={{ height: "100%", width: "100%" }}
          >
            {slidesWithKeys.map(({ iframeTag, key }) => (
              <SwiperSlide key={key} style={{ height: "auto" }}>
                <MovieListItem iframeTag={iframeTag} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div
          className="nav-area-vertical nav-area-next-vertical"
          onClick={handleNextClick}
        ></div>
      </div>
    </div>
  );
});

MovieList.displayName = "MovieList";
export default MovieList;
