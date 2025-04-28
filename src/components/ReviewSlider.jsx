import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiStarFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '../css/components/ReviewSlider.css';

const ReviewSlider = ({ reviews = [], hotelId }) => {
  const navigate = useNavigate();

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="review-slider-box">
      <div className="review-slider-header">
        <div className="review-slider-header-left">
          <RiStarFill className="review-slider-star filled" />
          {averageRating} ({reviews.length}) 숙소리뷰
        </div>
        <div className="review-slider-header-right">
          <button
            className="review-slider-seeall-btn"
            onClick={() => navigate(`/reviewdetail/${hotelId}`)}
          >
            전체보기 &gt;
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={3}
        navigation
        className="review-slider-swiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-slider-card">
              
             
              
              {/* 별점 */}
              <div className="review-slider-stars">
                {[...Array(5)].map((_, i) => (
                  <RiStarFill
                    key={i}
                    className={`review-slider-star ${i < review.rating ? 'filled' : ''}`}
                  />
                ))}
              </div>
              
              

              {/* 작성일 */}
              <div className="review-slider-date">{review.date}</div>

              {/* 내용 */}
              <div className="review-slider-text">{review.content}</div>

               {/* 이미지 추가 부분 */}
               {review.img && (
                <img
                  src={`/imgs/review-images/${review.img}`}
                  alt="리뷰 이미지"
                  className="review-slider-image"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
