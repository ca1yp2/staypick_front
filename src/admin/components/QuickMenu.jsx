import React from 'react';
import '../css/QuickMenu.css';
import { useNavigate } from 'react-router-dom';

const QuickMenu = () => {
  const navigate = useNavigate();
  console.log('ReviewPreview 렌더링됨');
  return (
    <div className="quick-menu-box">
      <button onClick={() => navigate('/admin/close-open')}>예약 닫기/열기</button>
      <button onClick={() => navigate('/admin/discount')}>할인 설정</button>
      <button onClick={() => navigate('/admin/reservations/new')}>신규 예약 등록</button>
    </div>
  );
};

export default QuickMenu;
