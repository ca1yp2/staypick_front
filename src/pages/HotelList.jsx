import React, { useState } from 'react';
import hotels from '../data/hotels.json';
import FilterBar from '../components/FilterBar';
import '../css/HotelList.css';

const HotelList = () => {
  const [location, setLocation] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  const handleSearch = () => {
    const results = hotels.filter((hotel) => {
      const matchesLocation = location === '' || hotel.location.includes(location);
      return matchesLocation;
    });
    setFilteredHotels(results);
  };

  return (
    <div className="hotel-list-container">
      <div className="page-title">
        <h2>원하는 숙소를 조건별로 검색해보세요</h2>
      </div>

      {/* ✅ FilterBar 컴포넌트 연결 */}
      <FilterBar
        location={location}
        setLocation={setLocation}
        onSearch={handleSearch}
      />

      {/* 여기에 호텔 리스트 출력도 추가 가능 */}
    </div>
  );
};

export default HotelList;
