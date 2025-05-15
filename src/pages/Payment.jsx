import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Coupon from '../components/Coupon';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { RiInformationLine } from 'react-icons/ri';
import '../css/payment.css';
import ReservationGuide from '../components/ReservationGuide';
import UserInfoEdit from '../components/UserInfoEdit';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return '';
  }
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return cleaned;
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomInfo = location.state?.roomInfo;
  const hotelData = location.state?.hotel;

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showUserInfoEditModal, setShowUserInfoEditModal] = useState(false); // 예약자 정보 수정 모달 상태
  const [name, setName] = useState('홍길동');
  const [phone, setPhone] = useState('01012345678');
  const [isSameAsBooker, setIsSameAsBooker] = useState(true);
  const [guestName, setGuestName] = useState('홍길동');
  const [guestPhone, setGuestPhone] = useState('01012345678');
  const [guestPhoneFormatted, setGuestPhoneFormatted] = useState('010-1234-5678');

  const [selectedCoupon, setSelectedCoupon] = useState(null); // 선택된 쿠폰 정보 상태
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0); // 쿠폰 할인 금액 상태
  const [finalPrice, setFinalPrice] = useState(0); // 총 결제 금액 상태

  const [visit, setVisit] = useState('');
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  
  useEffect(() => {
    setGuestPhoneFormatted(formatPhoneNumber(guestPhone));
  }, [guestPhone]);

  useEffect(() => {
    // 선택된 쿠폰 또는 룸 정보가 변경될 때마다 최종 가격 업데이트
    calculateFinalPrice();
  }, [selectedCoupon, roomInfo]);

  useEffect(() => {
    const isVisitSelected = !!visit;
    const isGuestInfoFilled = isSameAsBooker || (guestName.trim() !== '' && guestPhone.trim() !== '');

    setIsPaymentEnabled(isVisitSelected && isGuestInfoFilled);
  },[visit, guestName, guestPhone, isSameAsBooker]);

  const handleShowUserInfoEditModal = () => {
    setShowUserInfoEditModal(true);
  };

  const handleCloseUserInfoEditModal = () => setShowUserInfoEditModal(false);
  const handleSaveUserInfo = () => setShowUserInfoEditModal(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (isSameAsBooker) {
      setGuestName(e.target.value);
    }
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (isSameAsBooker) {
      setGuestPhone(e.target.value);
    }
  };
  const handleSameAsBookerChange = (e) => {
    setIsSameAsBooker(e.target.checked);
    if (e.target.checked) {
      setGuestName(name);
      setGuestPhone(phone);
    } else {
      setGuestName('');
      setGuestPhone('');
    }
  };
  const handleGuestNameChange = (e) => setGuestName(e.target.value);
  const handleGuestPhoneChange = (e) => {
    const rawPhoneNumber = e.target.value.replace(/\D/g, '');
    setGuestPhone(rawPhoneNumber);
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const defaultroomInfo = {
    name: '',
    personnel: '',
    checkin: '',
    checkout: '',
    discountprice: 0,
    regularprice: 0,
  };
  const currentroomInfo = roomInfo || defaultroomInfo;

  const regularPrice = Number(currentroomInfo.regularprice);
  const discountPriceFromData = Number(currentroomInfo.discountprice); // rooms.json에서 가져온 할인 가격
  const regularFormatted = regularPrice.toLocaleString();
  const initialDiscountAmount = regularPrice - discountPriceFromData;
  const initialDiscountAmountFormatted = initialDiscountAmount.toLocaleString();
  const discountFormatted = discountPriceFromData.toLocaleString();

  const calculateFinalPrice = () => {
    let calculatedCouponDiscountAmount = 0;
    let priceAfterInitialDiscount = regularPrice; // 초기 가격을 정가로 설정

    // rooms.json 할인이 적용된 경우, 해당 할인을 먼저 반영
    if (discountPriceFromData < regularPrice) {
      priceAfterInitialDiscount = discountPriceFromData;
    }

    let calculatedFinalPrice = priceAfterInitialDiscount;

    if (selectedCoupon) {
      if (selectedCoupon.discountType === 'fixed') {
        calculatedCouponDiscountAmount = Number(selectedCoupon.discount);
        calculatedFinalPrice -= calculatedCouponDiscountAmount;
      } else if (selectedCoupon.discountType === 'percentage') {
        calculatedCouponDiscountAmount = (priceAfterInitialDiscount * Number(selectedCoupon.discount)) / 100;
        calculatedFinalPrice -= calculatedCouponDiscountAmount;
      }
      if (calculatedFinalPrice < 0) {
        calculatedFinalPrice = 0; // 최소 0원
      }
    }
    setCouponDiscountAmount(calculatedCouponDiscountAmount);
    setFinalPrice(calculatedFinalPrice);
  };

  //방문 수단 선택
  const handleVisit = (event) => {
    setVisit(event.target.value);
  };

  //결제취소 버튼
  const handleCancelPayment = () => {
    navigate(-1);
  };

  //결제하기 버튼
  const handleProceedPayment = () => {
    if(isPaymentEnabled){
      navigate('/tosscheckout', { 
        state: { 
          finalPrice: finalPrice,
          hotel: hotelData,
          room: roomInfo
        } 
      });
    }else{
      console.log('필수 정보가 입력되지 않았습니다.');
    }
    
  };

  if (!hotelData) {
    return <div>선택된 호텔 정보가 없습니다.</div>;
  }

  return (
    <div className="gray-bg">
      <Container>
        <div className="rectangle">
          <div className="text-wrapper-2">
            <p>예약</p>
          </div>
          <div className="text-wrapper-3">숙소</div>
          <div className="rectangle-2">
            <p>
              {hotelData.name} {roomInfo.name} 숙박/1박
              <RiInformationLine onClick={handleShowModal} style={{ cursor: 'pointer' }} />
            </p>
          </div>
          <div className="text-wrapper-3">시간</div>
          <Row className="timebox">
            <Col md={6}>
              <div className="checkin">
                <div className="checkin-name">체크인</div>
                <div className="checkin-date">2025.03.25 (화)</div>
                <div className="checkin-time">{roomInfo.checkin}</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="checkout">
                <div className="checkout-name">체크아웃</div>
                <div className="checkout-date">2025.03.26 (수)</div>
                <div className="checkout-time">{roomInfo.checkout}</div>
              </div>
            </Col>
          </Row>
          <Row className="pricebox">
            <Col md={7}>
              <div className="text-wrapper-14">
                <i className="ri-group-line"></i> {roomInfo.personnel}
              </div>
            </Col>
            <Col md={5}>
              <div className="text-wrapper-16">
                숙박/1박 <span className="element">{discountFormatted}원</span>
              </div>
            </Col>
          </Row>
          <Row className="rectangle-3">
            <Col md={8}>
              <div className="text-wrapper-13">방문수단 선택</div>
            </Col>
            <Col md={4}>
              <Row className="checkblock">
                <Col md={2} className="checktextbox">
                  <Row>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        className="inputcheckcircle"
                        name="visit"
                        value="walk"
                        checked={visit === 'walk'}
                        onChange={handleVisit}
                      />
                    </Col>
                    <Col md={8}>
                      <div className="checktext">도보</div>
                    </Col>
                  </Row>
                </Col>
                <Col md={2} className="checktextbox">
                  <Row>
                    <Col md={4}>
                      <input
                        type="checkbox"
                        className="inputcheckcircle"
                        name="visit"
                        value="car"
                        checked={visit === 'car'}
                        onChange={handleVisit}
                      />
                    </Col>
                    <Col md={8}>
                      <div className="checktext">차량</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="text-wrapper-3">예약자 정보</div>
          <div className="rectangle-2">
            <p>
              {name}/{formatPhoneNumber(phone)}
              <span className="text-primary" onClick={handleShowUserInfoEditModal}>
                변경하기
              </span>
            </p>
          </div>
          <div className="text-wrapper-3">이용자 정보</div>
          <div className="sameinfo">
            <Form.Check
              type="checkbox"
              label="예약자 정보와 같아요."
              checked={isSameAsBooker}
              onChange={handleSameAsBookerChange}
            />
          </div>
          <div className="userinfo">
            <div className="text-wrapper-34">성명</div>
            <Form.Control
              type="text"
              value={guestName}
              onChange={handleGuestNameChange}
              placeholder={isSameAsBooker ? name : ''}
              readOnly={isSameAsBooker}
            />
          </div>
          <div className="userinfo">
            <div className="text-wrapper-34">휴대폰 번호</div>
            <Form.Control
              type="tel"
              value={guestPhoneFormatted}
              onChange={handleGuestPhoneChange}
              placeholder={isSameAsBooker ? formatPhoneNumber(phone) : ''}
              readOnly={isSameAsBooker}
            />
          </div>
          <Coupon onCouponSelect={handleCouponSelect} /> {/* onCouponSelect prop 전달 */}
          <div className="text-wrapper-6">결제 금액</div>
          <div className="text-wrapper-28">
            상품 금액<span>{regularFormatted}원</span>
          </div>
          <div className="text-wrapper-28">
            할인 금액<span>{Number(initialDiscountAmount + couponDiscountAmount).toLocaleString()}원</span>
          </div>
          <div className="text-wrapper-3 mb-5">
            총 결제 금액<span>{Number(finalPrice).toLocaleString()}원</span>
          </div>
          <div className='text-center'>
            <Button className='btn-secondary me-2' onClick={handleCancelPayment}>결제취소</Button>
            <Button onClick={handleProceedPayment} disabled={!isPaymentEnabled}>결제하기</Button>
          </div>
        </div>
        <ReservationGuide show={showModal} onHide={handleCloseModal} />
        <UserInfoEdit
          show={showUserInfoEditModal}
          onHide={handleCloseUserInfoEditModal}
          name={name}
          phone={phone}
          onNameChange={handleNameChange}
          onPhoneChange={handlePhoneChange}
          onSave={handleSaveUserInfo}
        />
      </Container>
    </div>
  );
};

export default Payment;