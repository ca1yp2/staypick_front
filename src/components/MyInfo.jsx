import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyInfo.css';

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [showCoupons, setShowCoupons] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [editedUser, setEditedUser] = useState({
    username: '',
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditedUser({
        username: parsedUser.username || '',
        name: parsedUser.name || '',
        phone: parsedUser.phone || '',
        email: parsedUser.email || '',
      });
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

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    setUser({ ...user, ...editedUser });
    localStorage.setItem('user', JSON.stringify({ ...user, ...editedUser }));
    alert('수정이 완료되었습니다.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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
            <input
              type="text"
              value={editedUser.username}
              name="username"
              className="info-input"
              readOnly
            />
          </div>

          <div className="info-row">
            <label>이름</label>
            <input
              type="text"
              value={editedUser.name}
              name="name"
              onChange={handleInputChange}
              className="info-input"
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-row">
            <label>전화번호</label>
            <input
              type="text"
              value={editedUser.phone}
              name="phone"
              onChange={handleInputChange}
              className="info-input"
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-row">
            <label>이메일</label>
            <input
              type="email"
              value={editedUser.email}
              name="email"
              onChange={handleInputChange}
              className="info-input"
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-row">
            <label>보유 쿠폰</label>
            <div
              className="coupon-box"
              onClick={(e) => {
                e.stopPropagation();
                setShowCoupons((prev) => !prev);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="coupon-header">
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
            {!isEditMode ? (
              <button className="review-btn" onClick={handleEditClick}>
                수정하기
              </button>
            ) : (
              <button className="review-btn" onClick={handleSaveClick}>
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
