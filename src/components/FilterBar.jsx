import React, { useState } from 'react';
import { RiMapPinLine, RiCalendarLine, RiFilter3Line } from 'react-icons/ri';
import RegionModal from './RegionModal';
import '../css/components/FilterBar.css';

const FilterBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSelect = (value) => {
    setSelectedRegion(value);
    setShowModal(false);
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

        <button className="date-button">
          <RiCalendarLine /> 2025.03.14~2025.03.21
        </button>

        <button className="search-btn">검색</button>
      </div>

      <div className="filter-row bottom">
        <div className="category-buttons">
          <button className="category-btn active">전체선택</button>
          <button className="category-btn">호텔/모텔</button>
          <button className="category-btn">펜션/풀빌라</button>
          <button className="category-btn">게하/한옥</button>
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