import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyInfo.css';

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [showCoupons, setShowCoupons] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // 여기서 username도 같이 가져오게 됨
    }

    const fetchCoupons = async () => {
      try {
        const res = await axios.get('/data/coupons.json');
        setCoupons(res.data || []);
      } catch (err) {
        console.error('쿠폰 데이터 로딩 실패:', err);
      }
    };

    fetchCoupons();
  }, []);

  if (!user) {
    return <div className="reservation-list">⚠️ 로그인이 필요합니다.</div>;
  }

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user)); // 수정된 값 저장
    alert('정보가 저장되었습니다.');
    setIsEditing(false);
  };

  return (
    <div className="reservation-list">
      <h2>내 정보</h2>

      <div className="reservation-card">
        <div className="reservation-info">
          <div className="info-row">
            <label>아이디</label>
            <input
              type="text"
              value={user.username || ''} // ★ username 가져오기
              readOnly
              className="info-input"
            />
          </div>

          <div className="info-row">
            <label>이름</label>
            <input
              type="text"
              value={user.name || ''}
              readOnly={!isEditing}
              className="info-input"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="info-row">
            <label>전화번호</label>
            <input
              type="text"
              value={user.phone || ''}
              readOnly={!isEditing}
              className="info-input"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

          <div className="info-row">
            <label>이메일</label>
            <input
              type="email"
              value={user.email || ''}
              readOnly
              className="info-input"
            />
          </div>

          <div className="info-row">
            <label>보유 쿠폰</label>
            <div className="coupon-box">
            <div className="coupon-header" onClick={() => setShowCoupons(prev => !prev)}>
                {coupons.length}개 {showCoupons ? '▲' : '▼'}
                </div>

              {showCoupons && (
                <ul className="coupon-list">
                  {coupons.map((coupon) => (
                    <li key={coupon.id} className="coupon-item">
                      {coupon.name} (유효기간: {coupon.expiration})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="button-group">
            {!isEditing ? (
              <button className="review-btn" onClick={() => setIsEditing(true)}>
                수정하기
              </button>
            ) : (
              <button className="review-btn" onClick={handleSave}>
                저장하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
