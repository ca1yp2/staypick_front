import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { RiInformationLine } from "react-icons/ri";
import '../css/payment.css'

const Payment = () => {
  const location = useLocation();
  const saveLocation = location.state;
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
              <div className="checkin-time">15:00</div>
            </div>
            </Col>
            <Col md={6}>
            <div className="checkout">
              <div className="checkout-name">체크아웃</div>
              <div className="checkout-date">2025.03.26 (수)</div>
              <div className="checkout-time">11:00</div>
            </div>
            </Col>
          </Row>
          <Row className="pricebox">
            <Col md={6}><div className="text-wrapper-14"><i className="ri-group-line"></i> 기준3명 / 최대 4명</div></Col>
            <Col md={6}><div className="text-wrapper-16">숙박/1박 <span className="element">178,000원</span></div></Col>
          </Row>
          <Row className="rectangle-3">
            <Col md={8}>
              <div className="text-wrapper-13">방문수단 선택</div>
            </Col>
            <Col md={4}>
              <Row className="checkblock">
                <Col md={2} className="checktextbox">
                  <Row>
                    <Col md={4}><input type="checkbox" className="inputcheckcircle" /></Col>
                    <Col md={8}><div className="checktext">도보</div></Col>
                  </Row>
                </Col>
                <Col md={2} className="checktextbox">
                  <Row>
                    <Col md={4}><input type="checkbox" className="inputcheckcircle" /></Col>
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
          <div className="text-wrapper-3">할인</div>
          <div className="rectangle-4 py-1">
            <input type="checkbox" className="inputcheckcircle ms-3" />
            <span className='ms-1'>선택안함</span>
          </div>
          <div className="rectangle-4 py-1">
            <input type="checkbox" className="inputcheckcircle ms-3" /><span className='ms-1'>쿠폰할인</span><span className="mycoupon text-primary">내 쿠폰함</span>
          </div>
          <div className="div">
            <div className="couponbox">
              <div className="couponinfo">
                <div className="text-wrapper-39">리뷰작성 7,000원 할인쿠폰</div>
                  <p className="text-wrapper-41">유효기간 2025. 06. 31 까지</p>
              </div>
              <button type="button" className="btn btn-primary">선택하기</button>
            </div>
            <div className="couponbox">
              <div className="couponinfo">
                <div className="text-wrapper-39">첫 예약 15% 할인쿠폰</div>
                <p className="text-wrapper-41">유효기간 2025. 06. 31 까지</p>
              </div>
              <button type="button" className="btn btn-primary">선택하기</button>
            </div>
          </div>
          <div className="text-wrapper-6">결제 금액</div>
          <div className="text-wrapper-28">상품 금액<span>1,246,000원</span></div>
          <div className="text-wrapper-28">할인 금액<span>186,900원</span></div>
          <div className="text-wrapper-3">총 결제 금액<span>1,059,100원</span></div>
        </div>
      </Container>
    </div>
  )
}

export default Payment