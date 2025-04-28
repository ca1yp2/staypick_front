import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Coupon = ({ onCouponSelect }) => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 쿠폰 할인 선택 드롭다운 상태
  const [isUseCoupon, setIsUseCoupon] = useState(false);
  const [isCouponDropdownOpen, setIsCouonDropdownOpen] = useState(false);
  const [isNoCoupon, setIsNoCoupon] = useState(true);

  const handleCouponBox = (event) => {
    const checked = event.target.checked;
    setIsUseCoupon(checked);
    setIsCouonDropdownOpen(checked); // 체크될 때 드롭다운 열기
    if (checked) {
      setIsNoCoupon(false); // "할인 쿠폰 사용" 체크 시 "선택 안함" 해제
    } else {
      setIsCouonDropdownOpen(false); // 체크 해제될 때 드롭다운 닫기
      setIsNoCoupon(!selectedCoupon); // 선택된 쿠폰 없으면 "선택 안함" 체크
      setSelectedCoupon(null);
      if (onCouponSelect) {
        onCouponSelect(null);
      }
    }
  };

  const handleNoCouponBox = (event) => {
    const checked = event.target.checked;
    setIsNoCoupon(checked);
    setIsUseCoupon(!checked);
    setIsCouonDropdownOpen(!checked);
    if (checked) {
      setSelectedCoupon(null);
      if (onCouponSelect) {
        onCouponSelect(null);
      }
    }
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsUseCoupon(true);
    setIsCouonDropdownOpen(false);
    setIsNoCoupon(false);
    if (onCouponSelect) {
      onCouponSelect(coupon);
    }
  };

  useEffect(() => {
    axios
      .get('/data/coupon.json')
      .then((res) => setCoupons(res.data))
      .catch((err) => console.log('데이터 로딩 실패', err));
  }, []);

  return (
    <>
      <div className="text-wrapper-3">할인</div>
      <div className="rectangle-4 py-1">
        <input
          type="checkbox"
          className="inputcheckcircle ms-3"
          checked={isNoCoupon}
          onChange={handleNoCouponBox}
        />
        <span className="ms-1">선택안함</span>
      </div>
      <div className="rectangle-4 py-1">
        <input
          type="checkbox"
          className="inputcheckcircle ms-3"
          checked={isUseCoupon}
          onChange={(event) => { // 이벤트 핸들러 함수를 인라인으로 정의
            const checked = event.target.checked;
            setIsUseCoupon(checked);
            setIsCouonDropdownOpen(checked); // 체크 상태에 따라 드롭다운 상태 변경
            if (checked) {
              setIsNoCoupon(false);
            } else {
              setIsCouonDropdownOpen(false);
              setIsNoCoupon(!selectedCoupon);
              setSelectedCoupon(null);
              if (onCouponSelect) {
                onCouponSelect(null);
              }
            }
          }}
        />
        <span className="ms-1">할인 쿠폰 사용</span>
        {selectedCoupon && (
          <span className="text.secondary"> ({selectedCoupon.name})</span>
        )}
      </div>
      <div className={`coupon-dropdown ${isCouponDropdownOpen ? 'open' : ''}`}>
        <div className="div">
          {Array.isArray(coupons) &&
            coupons.map((coupon) => (
              <div className="couponbox" key={coupon.id}>
                <div className="couponinfo">
                  <div className="text-wrapper-39">{coupon.name}</div>
                  <p className="text-wrapper-41">유효기간 {coupon.expiration} 까지</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSelectCoupon(coupon)}
                >
                  선택하기
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Coupon;