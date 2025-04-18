import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import Coupon from '../components/Coupon';
import { Container, Row, Col } from 'react-bootstrap'
import { RiInformationLine } from "react-icons/ri";
import '../css/payment.css'

const Payment = () => {
  const location = useLocation();
  const saveLocation = location.state;

  //할인 금액 계산
  const discountAmount = Number(saveLocation.regularprice - saveLocation.discountprice).toLocaleString();

  //금액 천 단위 구분 기호(,) 표시
  const regular = Number(saveLocation.regularprice).toLocaleString();
  const discount = Number(saveLocation.discountprice).toLocaleString();

  //방문 수단 선택
  const [visit, setVisit] = useState('');
  const handleVisit = (event) => {
    setVisit(event.target.value);
  };

  return (
    <div className="gray-bg">
      <Container>
        <div className="rectangle">
          <div className="text-wrapper-2">
            <p>예약</p>
          </div>
          <div className="text-wrapper-3">숙소</div>
          <div className="rectangle-2">
            <p>경주 리한셀렉트 {saveLocation.name} 숙박/1박<RiInformationLine /></p>
          </div>
          <div className="text-wrapper-3">시간</div>
          <Row className="timebox">
            <Col md={6}>
            <div className="checkin">
              <div className="checkin-name">체크인</div>
              <div className="checkin-date">2025.03.25 (화)</div>
              <div className="checkin-time">{saveLocation.checkin}</div>
            </div>
            </Col>
            <Col md={6}>
            <div className="checkout">
              <div className="checkout-name">체크아웃</div>
              <div className="checkout-date">2025.03.26 (수)</div>
              <div className="checkout-time">{saveLocation.checkout}</div>
            </div>
            </Col>
          </Row>
          <Row className="pricebox">
            <Col md={7}><div className="text-wrapper-14"><i className="ri-group-line"></i> {saveLocation.personnel}</div></Col>
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
            <p>홍길동/010-1234-5678<a href="#" className="text-primary">변경하기</a></p>
          </div>
          <div className="text-wrapper-3">이용자 정보</div>
          <div className="sameinfo">
            <input type="checkbox" />
            <span>예약자 정보와 같아요.</span>
          </div>
          <div className="userinfo">
            <div className="text-wrapper-34">성명</div>
            <div className="text-wrapper-36">홍길동</div>
          </div>
          <div className="userinfo">
            <div className="text-wrapper-34">휴대폰 번호</div>
            <div className="text-wrapper-36">010-1234-5678</div>
          </div>
          <Coupon />
          <div className="text-wrapper-6">결제 금액</div>
          <div className="text-wrapper-28">상품 금액<span>{regular}원</span></div>
          <div className="text-wrapper-28">할인 금액<span>{discountAmount}원</span></div>
          <div className="text-wrapper-3">총 결제 금액<span>{discount}원</span></div>
        </div>
      </Container>
    </div>
  )
}

export default Payment