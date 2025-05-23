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
    email: '',
    tel: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8081/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
        setEditedUser({
          username: res.data.userid || '',
          email: res.data.email || '',
          tel: res.data.tel || '',
        });
      } catch (err) {
        console.error('⚠️ 사용자 정보 조회 실패:', err);
      }
    };

    const fetchCoupons = async () => {
      try {
        const res = await axios.get('/data/coupons.json');
        setCoupons(res.data || []);
      } catch (err) {
        console.error('쿠폰 데이터 로딩 실패:', err);
      }
    };

    fetchUser();
    fetchCoupons();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:8081/api/auth/profile', {
        username: user.username,
        email: editedUser.email,
        tel: editedUser.tel
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data);
      setIsEditMode(false);
      alert('✅ 수정이 완료되었습니다.');
    } catch (err) {
      console.error('❌ 사용자 정보 수정 실패:', err);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
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
            <label>전화번호</label>
            <input
              type="text"
              value={editedUser.tel}
              name="tel"
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
