import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Coupon = ({onCouponSelect}) => {

  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  //쿠폰 할인 선택 드롭다운
  const [isUseCoupon, setIsUseCoupon] = useState(false);
  const [isCouponDropdownOpen, setIsCouonDropdownOpen] = useState(false);
  const [isNoCoupon, setIsNoCoupon] = useState(true);

  const handleCouponBox = (event) => {
    const checked = event.target.checked;
    setIsUseCoupon(checked);
    setIsCouonDropdownOpen(checked);
    setIsNoCoupon(!checked);
    if (!checked) {
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
    if(onCouponSelect){
      onCouponSelect(coupon);
    }
  }

  useEffect(()=>{
    axios
      .get('/data/coupon.json')
      .then((res)=>setCoupons(res.data))
      .catch((err)=>console.log('데이터 로딩 실패', err));
  }, []);

  return (
    <>
      <div className="text-wrapper-3">할인</div>
      <div className="rectangle-4 py-1">
        <input type="checkbox" className="inputcheckcircle ms-3" checked={isNoCoupon} onChange={handleNoCouponBox} />
        <span className='ms-1'>선택안함</span>
      </div>
      <div className="rectangle-4 py-1">
        <input type="checkbox" className="inputcheckcircle ms-3" checked={isUseCoupon} onChange={handleCouponBox} />
        <span className='ms-1'>할인 쿠폰 사용</span>
        {selectedCoupon && (
          <span className='text.secondary'>
            ({selectedCoupon.name})
          </span>
        )}
      </div>
      <div class={`coupon-dropdown ${isCouponDropdownOpen ? 'open' : ''}`}>
        <div className="div">
          {Array.isArray(coupons) &&
            coupons.map((coupon) =>(
              <>
                <div className="couponbox" key={coupon.id}>
                  <div className="couponinfo">
                    <div className="text-wrapper-39">{coupon.name}</div>
                      <p className="text-wrapper-41">유효기간 {coupon.expiration} 까지</p>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() => handleSelectCoupon(coupon)}>선택하기</button>
                </div>
              </>
            ))}
        </div>
      </div>
      
    </>
  )
}

export default Coupon