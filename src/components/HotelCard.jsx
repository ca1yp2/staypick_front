import React from 'react';
<<<<<<< HEAD
import {
  RiMapPinLine,
  RiHotelLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';
=======
>>>>>>> e3fa647 (Footer부분 추가)
import '../css/components/HotelCard.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-image">
        <img src={`/images/${hotel.id}.jpg`} alt={hotel.name} />
      </div>
<<<<<<< HEAD

      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>

        <p className="hotel-location">
          <RiMapPinLine /> {hotel.location}
        </p>

        <p className="hotel-category">
          <RiHotelLine /> {hotel.category}
        </p>

        <p className="hotel-price">
          <RiMoneyDollarCircleLine /> ₩{hotel.price.toLocaleString()} / 1박
        </p>

=======
      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">📍 {hotel.location}</p>
        <p className="hotel-category">{hotel.category}</p>
        <p className="hotel-price">₩{hotel.price.toLocaleString()} / 1박</p>
>>>>>>> e3fa647 (Footer부분 추가)
        <button className="reserve-btn">예약하기</button>
      </div>
    </div>
  );
};

export default HotelCard;