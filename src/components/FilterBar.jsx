import React, { useState } from 'react';
import { RiMapPinLine } from 'react-icons/ri';
import RegionModal from './RegionModal';
import DateRangePicker from './DateRangePicker';
import '../css/components/FilterBar.css';

const FilterBar = ({ onRegionChange, onDateChange, onCategoryChange, onSearch, onSortChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체선택');
  const [selectedSort, setSelectedSort] = useState('recommend'); // 기본값 추천순

  const categories = [
    { label: '전체선택', value: '전체선택' },
    { label: '호텔/모텔', value: '호텔' },
    { label: '펜션/풀빌라', value: '펜션' },
    { label: '게하/한옥', value: '게스트하우스' },
  ];

  const sortOptions = [
    { label: '추천순', value: 'recommend' },
    { label: '가격낮은 순', value: 'price-asc' }
  ];

  const handleSelect = (value) => {
    setSelectedRegion(value);
    setShowModal(false);
    onRegionChange && onRegionChange(value);
  };

  const handleDateChange = (checkIn, checkOut) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    onDateChange && onDateChange(checkIn, checkOut);
  };

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    onCategoryChange && onCategoryChange(categoryValue);
  };

  const handleSearch = () => {
    onSearch && onSearch();
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    onSortChange && onSortChange(value);
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

        <DateRangePicker onDateChange={handleDateChange} />

        <button className="search-btn" onClick={handleSearch}>
          검색
        </button>
      </div>

      <div className="filter-row bottom">
        <div className="category-buttons">
          {categories.map((item) => (
            <button
              key={item.value}
              className={`category-btn ${selectedCategory === item.value ? 'active' : ''}`}
              onClick={() => handleCategoryClick(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="right-options">
          <select className="sort-dropdown" value={selectedSort} onChange={handleSortChange}>
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
