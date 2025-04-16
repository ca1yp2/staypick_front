<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import hotelData from '../data/hotels.json';
import FilterBar from '../components/FilterBar';
import HotelCard from '../components/HotelCard';
import '../css/HotelList.css';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  // 필터 조건 상태
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체선택');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // 검색 여부 상태
  const [hasSearched, setHasSearched] = useState(false);

  // 호텔 데이터 로딩
  useEffect(() => {
    setHotels(hotelData);
    setFilteredHotels(hotelData); // 전체 데이터 보유
  }, []);

  // 검색 실행
  const handleSearch = () => {
    const regionKeyword = selectedRegion.replace(' 전체', '').trim();

    const result = hotels.filter((hotel) => {
      const matchRegion = regionKeyword
        ? hotel.location.includes(regionKeyword)
        : true;

      const matchCategory =
        selectedCategory && selectedCategory !== '전체선택'
          ? hotel.category === selectedCategory
          : true;

      return matchRegion && matchCategory;
    });

    setFilteredHotels(result);
    setHasSearched(true); // 검색 완료 상태
  };

  return (
    <div className="hotel-list-page">
      <FilterBar
        onRegionChange={setSelectedRegion}
        onDateChange={(checkIn, checkOut) => {
          setCheckInDate(checkIn);
          setCheckOutDate(checkOut);
        }}
        onCategoryChange={setSelectedCategory}
        onSearch={handleSearch}
      />

      {/*검색 전에는 아무 것도 안 보이게 */}
      {hasSearched && (
        <div className="hotel-card-container">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      )}
=======
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
>>>>>>> e3fa647 (Footer부분 추가)
    </div>
  );
};

export default HotelList;