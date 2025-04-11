import React from 'react';
import FilterBar from '../components/FilterBar';
import HotelCard from '../components/HotelCard';
import '../css/HotelList.css'; // 스타일은 따로 관리

const HotelList = () => {
  const hotelData = [
    {
      id: 1,
      title: '힐튼 경주',
      location: '경주시 경주보문관광단지 내',
      price: '250,000원/박',
      image: './image/image1.png',
      rating: '⭐ 4.3 (5,532)',
      reviewCount: 278,
      reviews: [
        { stars: '⭐⭐⭐⭐⭐', date: '2023.03.01', text: '프론트 직원이 친절해서 좋았어요!' },
        { stars: '⭐⭐⭐⭐', date: '2023.06.12', text: '뷰도 좋고 방도 넓고 쾌적했어요.' },
        { stars: '⭐⭐⭐⭐⭐', date: '2024.01.05', text: '경주 오면 또 여기 올 거예요!' }
      ]
    },
  ];

  return (
    <div className="hotel-list-page">
      <FilterBar />
      <div className="card-list">
        {hotelData.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
