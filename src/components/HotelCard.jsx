import React from 'react';
import { RiMapPinLine, RiHeartLine } from 'react-icons/ri';
import '../css/components/HotelCard.css';
import defaultImage from '../assets/images/main-banner.png';

const HotelCard = ({ hotel }) => {
  return (
    <div className="card">
      <div className="card-top">
        <div className="thumbnail">
          <img src={hotel.image || defaultImage} alt="숙소 이미지" />
        </div>
        <div className="card-info">
          <div className="card-title-row">
            <h2>{hotel.title}</h2>
            <RiHeartLine className="heart-icon" />
          </div>
          <div className="location">
            <RiMapPinLine /> {hotel.location}
          </div>
          <div className="view-room">객실보기</div>
        </div>
        <div className="price-box">
          <div className="price">
            <strong>{hotel.price}</strong><span>/1박</span>
          </div>
        </div>
      </div>

      <div className="review-box">
        <div className="review-header">
          <span>{hotel.rating}</span>
          <span>· 숙소리뷰({hotel.reviewCount})</span>
        </div>
        <div className="review-items">
          {hotel.reviews.slice(0, 3).map((review, idx) => (
            <div className="review-item" key={idx}>
              <div className="stars">{review.stars}</div>
              <div className="date">{review.date}</div>
              <div className="text">{review.text}</div>
            </div>
          ))}
        </div>
        <div className="review-footer">
          <a href="#">전체보기 &gt;</a>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
