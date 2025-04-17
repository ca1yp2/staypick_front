import React, { useState, useEffect } from 'react';
// import hotelData from '../data/hotels.json'; ❌ import 방식 제거
import axios from 'axios';
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
    axios.get('/data/hotels.json') // ✅ public 경로에서 데이터 비동기로 불러오기
      .then((res) => {
        setHotels(res.data);
        setFilteredHotels(res.data); // 전체 데이터 보유
      })
      .catch((err) => console.error('호텔 데이터 로딩 실패', err));
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
    </div>
  );
};

export default HotelList;
