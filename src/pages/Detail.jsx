import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { RiArrowRightSLine, RiStarFill, RiMapPin2Fill, RiSendPlaneFill } from "react-icons/ri";
import '../css/detail.css'
import 'bootstrap/dist/css/bootstrap.css';
import Hero from '../components/Hero';


const Detail = () => {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <div className="room-type">호텔</div>
          <div className="acc-name">리한셀렉트 경주</div>
          <div className="acc-tag">#인기있는 숙소 #후기 좋은 숙소</div>
          <div className="pricetag">165,000원~</div>
          <div className="review-table">
            <div className="text-wrapper-5">후기 <RiArrowRightSLine /></div>
            <Row className='ml'>
              <Col md={9}><div className="reviewbox">
                <div className="grade"><RiStarFill className='yellow' /> 4.8</div>
                <div className="review">
                  아들과 함께 1박 2일 머물렀습니다. 전반적으로 만족스러운 숙박이었고, 5성급에 해당하는 서비스와 부대시설로 편안하게 쉬다 왔습니다.
                </div>
              </div></Col>
              <Col md={3}><img className="reviewimg" src="imgs/detail/reviewimg.png" /></Col>
            </Row>
          </div>
          <div className="service-table">
            <div className="service-main">서비스 및 부대시설</div>
            <Row className='ml'>
              <Col md={4}><span><img src="imgs/detail/fitness.png" alt="" />피트니스</span></Col>
              <Col md={4}><span><img src="imgs/detail/pool.png" alt="" />수영장</span></Col>
              <Col md={4}><span><img src="imgs/detail/minibar.png" alt="" />미니바</span></Col>
              <Col md={4}><span><img src="imgs/detail/sauna.png" alt="" />사우나</span></Col>
              <Col md={4}><span><img src="imgs/detail/wifi.png" alt="" />무선인터넷</span></Col>
              <Col md={4}><span><img src="imgs/detail/sg.png" alt="" />욕실용품</span></Col>
            </Row>
          </div>
          <div className="location-table">
            <div className="location-main"><a href="#">위치 정보 <RiArrowRightSLine /></a></div>
            <div className="location-sub1"><RiMapPin2Fill /> 경북 경주시 신평동 370 <a href="#">지도보기</a></div>
            <div className="location-sub2"><RiSendPlaneFill /> 보문관광단지 부근</div>
          </div>
        </Col>
        <Col md={7} className='mt-10'>
          <Row className='imgbox'>
            <Col md={6} className="imgbox1">
              <img src="imgs/detail/image 5.png" alt="05" />
            </Col>
            <Col md={6}>
              <Row className="imgbox2">
                <Col md={6}><img src="imgs/detail/image 6.png" alt="06" /></Col>
                <Col md={6}><img src="imgs/detail/image 7.png" alt="07" /></Col>
                <Col md={6}><img src="imgs/detail/image 8.png" alt="08" /></Col>
                <Col md={6}><img src="imgs/detail/image 9.png" alt="09" /></Col>
              </Row>
            </Col>
          </Row>
          <Hero />
        </Col>
      </Row>
    </Container>
  )
}

export default Detail