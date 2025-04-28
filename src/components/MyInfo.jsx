import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyInfo.css'; // 예약내역과 통일

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchCoupons = async () => {
      try {
        const res = await axios.get('/data/coupons.json');
        setCoupons(res.data || []);
      } catch (err) {
        console.error('쿠폰 데이터 불러오기 실패:', err);
      }
    };

    fetchCoupons();
  }, []);

  if (!user) {
    return <div className="reservation-list">⚠️ 로그인이 필요합니다.</div>;
  }

  return (
    <div className="reservation-list">
      <h2>내 정보</h2>

      <div className="reservation-card">
        <div className="reservation-info">
          <div className="info-row">
            <label>아이디</label>
            <input type="text" value={user.username || ''} readOnly className="info-input" />
          </div>

          <div className="info-row">
            <label>이름</label>
            <input type="text" value={user.name || ''} readOnly className="info-input" />
          </div>

          <div className="info-row">
            <label>전화번호</label>
            <input type="text" value={user.phone || ''} readOnly className="info-input" />
          </div>

          <div className="info-row">
            <label>이메일</label>
            <input type="email" value={user.email || ''} readOnly className="info-input" />
          </div>

          <div className="info-row">
            <label>보유 쿠폰</label>
            <input type="text" value={`${coupons.length}개`} readOnly className="info-input" />
          </div>

          <div className="button-group">
            <button className="review-btn">수정하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
