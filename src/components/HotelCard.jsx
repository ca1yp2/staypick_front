import React from 'react';
import '../css/components/HotelCard.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-image">
        <img src={`/images/${hotel.id}.jpg`} alt={hotel.name} />
      </div>
      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">📍 {hotel.location}</p>
        <p className="hotel-category">{hotel.category}</p>
        <p className="hotel-price">₩{hotel.price.toLocaleString()} / 1박</p>
        <button className="reserve-btn">예약하기</button>
      </div>
    </div>
  );
};

export default HotelCard;
