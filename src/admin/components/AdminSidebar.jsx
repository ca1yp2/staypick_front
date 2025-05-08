import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/AdminSidebar.css'; 

const AdminSidebar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/admin/data/accommodation.json')
      .then(res => res.json())
      .then(data => setAccommodation(data))
      .catch(err => console.error('Failed to load accommodation data:', err));
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric',
      weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-top">
        <div className="current-time">{formatDateTime(currentTime)}</div>
        <div className="accommodation-name">{accommodation ? accommodation.name : ''}</div>
      </div>

      <div className="admin-menu-section">
        <div className="menu-title">예약관리</div>
        <NavLink to="/admin/dashboard" className="admin-menu" activeclassname="active">예약달력</NavLink>
        <NavLink to="/admin/reservations" className="admin-menu" activeclassname="active">예약내역 보기</NavLink>
        <NavLink to="/admin/close-open" className="admin-menu" activeclassname="active">예약 닫기/열기</NavLink>
      </div>

      <div className="admin-menu-section">
        <div className="menu-title">숙소관리</div>
        <NavLink to="/admin/season" className="admin-menu" activeclassname="active">성수기/주말 기간 관리</NavLink>
        <NavLink to="/admin/price" className="admin-menu" activeclassname="active">객실 기본요금 수정</NavLink>
        <NavLink to="/admin/discount" className="admin-menu" activeclassname="active">할인/판매 설정</NavLink>
      </div>

      <div className="admin-menu-section">
        <div className="menu-title">고객관리</div>
        <NavLink to="/admin/inquiries" className="admin-menu" activeclassname="active">문의 관리</NavLink>
        <NavLink to="/admin/reviews" className="admin-menu" activeclassname="active">리뷰 관리</NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
