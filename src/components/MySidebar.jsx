// src/components/mypage/MySidebar.jsx
import React from 'react';
import '../css/MyPage.css';

const MySidebar = ({ selected, onSelect }) => {
  return (
    <div className="mypage-sidebar">
      <ul>
        <li className={selected === 'info' ? 'active' : ''} onClick={() => onSelect('info')}>
          내 정보
        </li>
        <li className={selected === 'reservations' ? 'active' : ''} onClick={() => onSelect('reservations')}>
          예약 내역
        </li>
        <li className={selected === 'reviews' ? 'active' : ''} onClick={() => onSelect('reviews')}>
          내 리뷰
        </li>
      </ul>
    </div>
  );
};

export default MySidebar;
