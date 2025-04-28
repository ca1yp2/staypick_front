import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import HotelCard from '../components/HotelCard';
import '../css/HotelList.css';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체선택');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [hasSearched, setHasSearched] = useState(false);

  // 호텔 데이터 + 리뷰 데이터 병합 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelRes, reviewRes] = await Promise.all([
          axios.get('/data/hotels.json'),
          axios.get('/data/reviews.json')
        ]);
    
        const reviewMap = new Map();
        reviewRes.data.forEach(item => {
          if (!reviewMap.has(item.hotelId)) {
            reviewMap.set(item.hotelId, []);
          }
          reviewMap.get(item.hotelId).push(item);
        });
    
        const hotelsWithReviews = hotelRes.data.map(hotel => ({
          ...hotel,
          reviews: reviewMap.get(hotel.id) || []
        }));
    
        setHotels(hotelsWithReviews);
        setFilteredHotels(hotelsWithReviews);
      } catch (err) {
        console.error('데이터 로딩 실패', err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const regionKeyword = selectedRegion.replace(' 전체', '').trim();
    console.log('선택된 지역:', selectedRegion);
    console.log('regionKeyword:', regionKeyword);
    console.log('호텔 리스트:', hotels);
    const result = hotels.filter((hotel) => {
      const matchRegion = regionKeyword
        ? hotel.location.includes(regionKeyword) || regionKeyword.includes(hotel.location)
        : true;

      const matchCategory =
        selectedCategory && selectedCategory !== '전체선택'
          ? hotel.category?.trim() === selectedCategory.trim()
          : true;
    if (!matchRegion || !matchCategory) {
            console.log(`필터 제외됨: ${hotel.name}`);
    }

      return matchRegion && matchCategory;
    });
    
    console.log('필터링 결과:', result);
    setFilteredHotels(result);
    setHasSearched(true);
  };

  const handleSortChange = (sortType) => {
    if (sortType === 'price-asc') {
      const sorted = [...filteredHotels].sort((a, b) => a.price - b.price);
      setFilteredHotels(sorted);
    }
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
        onSortChange={handleSortChange}
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
