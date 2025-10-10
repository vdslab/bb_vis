import React, { memo, useMemo, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import MovieListItem from "./MovieListItem";

const MovieList = memo(({ iframeTags, loading }) => {
  const swiperRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(260); // デフォルト値

  // 動画のアスペクト比に基づいて幅を計算
  useEffect(() => {
    const calculateSlideWidth = () => {
      // 利用可能な高さを取得（パディングやマージンを考慮）
      const videoHeight = window.innerHeight * 0.16; // 16vh相当

      // 16:9のアスペクト比で幅を計算
      const calculatedWidth = (videoHeight * 16) / 9;

      // 最小幅と最大幅を設定
      const minWidth = 200;
      const maxWidth = 400;
      const finalWidth = Math.max(
        minWidth,
        Math.min(maxWidth, calculatedWidth),
      );

      setSlideWidth(finalWidth);
    };

    calculateSlideWidth();
    window.addEventListener("resize", calculateSlideWidth);

    return () => {
      window.removeEventListener("resize", calculateSlideWidth);
    };
  }, []);

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
        {/* 読み込み中 */}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : !iframeTags || iframeTags.length === 0 ? (
          /* データがないとき */
          <div className="movie-no-data">No Data</div>
        ) : (
          /*  通常表示 */
          <Swiper
            ref={swiperRef}
            modules={[Navigation, A11y, Autoplay]}
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
              <SwiperSlide key={key} style={{ width: `${slideWidth}px` }}>
                <MovieListItem iframeTag={iframeTag} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="nav-area nav-area-next" onClick={handleNextClick}></div>
      </div>
    </div>
  );
});

MovieList.displayName = "MovieList";

export default MovieList;
