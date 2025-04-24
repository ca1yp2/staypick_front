import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Coupon from '../components/Coupon';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { RiInformationLine } from "react-icons/ri";
import '../css/payment.css'
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

  useEffect(() => {
    setGuestPhoneFormatted(formatPhoneNumber(guestPhone));
  }, [guestPhone])

  const handleShowUserInfoEditModal = () => {
    setShowUserInfoEditModal(true);
  };

  const handleCloseUserInfoEditModal = () => {
    setShowUserInfoEditModal(false);
  };

  const handleSaveUserInfo = () => {
    setShowUserInfoEditModal(false);
    // 여기서 변경된 이름과 전화번호를 처리하는 로직을 추가할 수 있습니다.
    console.log('변경된 이름:', name);
    console.log('변경된 전화번호:', phone);
    if (isSameAsBooker) {
      setGuestName(name);
      setGuestPhone(phone);
    }
  };

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

  const handleGuestNameChange = (e) => {
    setGuestName(e.target.value);
  };

  const handleGuestPhoneChange = (e) => {
    const rawPhoneNumber = e.target.value.replace(/\D/g, '');
    setGuestPhone(rawPhoneNumber);
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

  //할인 금액 계산
  const discountAmount = Number(roomInfo.regularprice - roomInfo.discountprice).toLocaleString();

  //금액 천 단위 구분 기호(,) 표시
  const regular = Number(roomInfo.regularprice).toLocaleString();
  const discount = Number(roomInfo.discountprice).toLocaleString();

  //방문 수단 선택
  const [visit, setVisit] = useState('');
  const handleVisit = (event) => {
    setVisit(event.target.value);
  };

  if(!hotelData){
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
            <p>{hotelData.name} {roomInfo.name} 숙박/1박<RiInformationLine onClick={handleShowModal} style={{ cursor: 'pointer'}} /></p>
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
            <Col md={7}><div className="text-wrapper-14"><i className="ri-group-line"></i> {roomInfo.personnel}</div></Col>
            <Col md={5}><div className="text-wrapper-16">숙박/1박 <span className="element">{discount}원</span></div></Col>
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
                      <input type="checkbox" className="inputcheckcircle" name="visit" value="walk" checked={visit === 'walk'} onChange={handleVisit} />
                    </Col>
                    <Col md={8}><div className="checktext">도보</div></Col>
                  </Row>
                </Col>
                <Col md={2} className="checktextbox">
                  <Row>
                    <Col md={4}><input type="checkbox" className="inputcheckcircle" name="visit" value="car" checked={visit === 'car'} onChange={handleVisit} /></Col>
                    <Col md={8}><div className="checktext">차량</div></Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="text-wrapper-3">예약자 정보</div>
          <div className="rectangle-2">
            <p>{name}/{formatPhoneNumber(phone)}<span className="text-primary" onClick={handleShowUserInfoEditModal}>변경하기</span></p>
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
          <Coupon />
          <div className="text-wrapper-6">결제 금액</div>
          <div className="text-wrapper-28">상품 금액<span>{regular}원</span></div>
          <div className="text-wrapper-28">할인 금액<span>{discountAmount}원</span></div>
          <div className="text-wrapper-3">총 결제 금액<span>{discount}원</span></div>
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
  )
}

export default Payment