import React, { useState } from 'react';
import MySidebar from '../components/MySidebar';
import MyReservations from '../components/MyReservations';
import MyInfo from '../components/MyInfo';
import MyReviews from '../components/MyReviews';
import MyInquiries from '../components/MyInquiry';
import '../css/MyPage.css';

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('reservations');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'reservations':
        return <MyReservations />;
      case 'info': 
        return <MyInfo />;
      case 'reviews':
        return <MyReviews />;
      case 'inquiry' :
        return  <MyInquiries />;
      default:
        return <div>콘텐츠를 선택해주세요</div>;
    }
  };

  return (
    <div className="mypage-wrapper">
      <div className="mypage-container">
        <MySidebar selected={selectedMenu} onSelect={setSelectedMenu} />
        <div className="mypage-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
