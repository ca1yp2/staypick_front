import React, { useState } from 'react';
import { RiMapPinLine, RiFilter3Line } from 'react-icons/ri';
import RegionModal from './RegionModal';
import DateRangePicker from './DateRangePicker';
import '../css/components/FilterBar.css';

<<<<<<< HEAD
const FilterBar = ({ onRegionChange, onDateChange, onCategoryChange, onSearch }) => {
=======
const FilterBar = () => {
>>>>>>> e3fa647 (Footer부분 추가)
  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
<<<<<<< HEAD
  const [selectedCategory, setSelectedCategory] = useState('전체선택');

  const categories = [
    { label: '전체선택', value: '전체선택' },
    { label: '호텔/모텔', value: '호텔' },
    { label: '펜션/풀빌라', value: '펜션' },
    { label: '게하/한옥', value: '게스트하우스' },
  ];
=======
>>>>>>> e3fa647 (Footer부분 추가)

  const handleSelect = (value) => {
    setSelectedRegion(value);
    setShowModal(false);
<<<<<<< HEAD
    onRegionChange && onRegionChange(value);
=======
>>>>>>> e3fa647 (Footer부분 추가)
  };

  const handleDateChange = (checkIn, checkOut) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
<<<<<<< HEAD
    onDateChange && onDateChange(checkIn, checkOut);
  };

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    onCategoryChange && onCategoryChange(categoryValue);
  };

  const handleSearch = () => {
    onSearch && onSearch();
=======
>>>>>>> e3fa647 (Footer부분 추가)
  };

  return (
    <div className="filter-section">
      <div className="filter-row">
        <button className="region-button" onClick={() => setShowModal(true)}>
          <RiMapPinLine /> 지역선택
        </button>

        <input
          type="text"
          className="location-input"
          placeholder="지역이나 숙소를 검색해보세요"
          value={selectedRegion}
          readOnly
        />

<<<<<<< HEAD
        <DateRangePicker onDateChange={handleDateChange} />

        <button className="search-btn" onClick={handleSearch}>
          검색
        </button>
=======
        {/* ✅ 달력 range-picker로 대체 */}
        <DateRangePicker onDateChange={handleDateChange} />

        <button className="search-btn">검색</button>
>>>>>>> e3fa647 (Footer부분 추가)
      </div>

      <div className="filter-row bottom">
        <div className="category-buttons">
<<<<<<< HEAD
          {categories.map((item) => (
            <button
              key={item.value}
              className={`category-btn ${selectedCategory === item.value ? 'active' : ''}`}
              onClick={() => handleCategoryClick(item.value)}
            >
              {item.label}
            </button>
          ))}
=======
          <button className="category-btn active">전체선택</button>
          <button className="category-btn">호텔/모텔</button>
          <button className="category-btn">펜션/풀빌라</button>
          <button className="category-btn">게하/한옥</button>
>>>>>>> e3fa647 (Footer부분 추가)
        </div>

        <div className="right-options">
          <div className="sort-filter">
            <RiFilter3Line /> 가격낮은 순
          </div>
        </div>
      </div>

      {showModal && (
        <RegionModal
          onSelect={handleSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default FilterBar;