import React from 'react';
import {
  RiMapPinLine,
  RiHotelLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '../css/components/HotelCard.css';
import ReviewSlider from './ReviewSlider';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const hotelinfo = (hotel) => {
    navigate("/detail",{
      state: {
        id: hotel.id
      }
    })
  }
  return (
    <div className="hotel-card">
      <div className="hotel-card-inner">
        <div className="hotel-image">
          <img src={`/imgs/hotel-images/${hotel.image}`} alt={hotel.name} />
        </div>

        <div className="hotel-info">
          <div className="info-top">
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="hotel-location">
              <RiMapPinLine /> {hotel.location}
            </p>
            <p className="hotel-category">
              <RiHotelLine /> {hotel.category}
            </p>
          </div>

          <div className="info-bottom">
            <div className="hotel-price">
              <RiMoneyDollarCircleLine /> ₩{hotel.price.toLocaleString()} / 1박
            </div>
            <button className="reserve-btn" onClick={()=>hotelinfo(hotel)}>예약하기</button>
          </div>
        </div>
      </div>

      {hotel.reviews && hotel.reviews.length > 0 && (
        <div className="review-container">
          <ReviewSlider reviews={hotel.reviews} hotelId={hotel.id} />
        </div>
      )}
    </div>
  );
};

export default HotelCard;
