import React from 'react';
import { RiMapPinLine, RiCalendarLine, RiFilter3Line } from 'react-icons/ri';
import '../css/components/FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <button><RiMapPinLine /> 지역선택</button>
      <input type="text" placeholder="지역이나 숙소를 검색해보세요" />
      <div className="date-range"><RiCalendarLine /> 2025.03.14~2025.03.21</div>
      <button className="blue-button">전체선택</button>
      <button>호텔/모텔</button>
      <button>펜션/풀빌라</button>
      <button>게하/한옥</button>
      <div className="sort-filter"><RiFilter3Line /> 가격낮은 순</div>
    </div>
  );
};

export default FilterBar;
