import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminHeader.css';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="admin-header-left">
          <h1 className="admin-logo">STAYPICK ADMIN</h1>
        </div>
        <div className="admin-header-right">
          <Link to="/mypage">내 숙소 보기</Link>
          <Link to="/admin/calendar">내 예약 달력 보기</Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
