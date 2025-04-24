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

  const goToDetail = () => {
    navigate("/detail", {
      state: hotelId
    })
  }

  return (
    <div className="review-slider">
      <div className="review-header">
        <div className="left">
          <span className="rating-label">
            <RiStarFill className="star-icon" />
            4.7 <small>({reviews.length})</small> 숙소리뷰
          </span>
        </div>
        <div className="right">
          <button className="see-all-btn" onClick={() => navigate(`/reviewdetail/${hotelId}`)}>
            전체보기 &gt;
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3}
        navigation
        className="review-swiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-box">
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <RiStarFill key={i} className="star-icon" />
                ))}
              </div>
              <div className="review-date">{review.date}</div>
              <div className="review-text">{review.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
