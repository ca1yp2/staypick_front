import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from 'reactstrap';
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri';

const Room = ({ infos, hotel }) => {
  const navigate = useNavigate();

  const reservation = (info) => {
    if(hotel){
      navigate("/payment", {
        state: {
          hotel: hotel,
          roomInfo:{
            name: info.name,
            personnel: info.personnel,
            checkin: info.checkin,
            checkout: info.checkout,
            discountprice: info.discountprice,
            regularprice: info.regularprice
          }
        }
      });
    }else{
      alert('선택된 호텔 정보가 없습니다.');
    }
  };

  return (
    <div className="rtbox">
      <Row>
        <Col md={1} className="text-center">
          <Button className="hero-prev">
            <RiArrowLeftWideFill />
          </Button>
        </Col>
        <Col md={10}>
          <Swiper
            modules={[Mousewheel, Navigation, Pagination]}
            slidesPerView={0.9}
            loop={infos.length > 2} // 슬라이드 수 체크
            navigation={{
              nextEl: '.hero-next',
              prevEl: '.hero-prev',
            }}
            mousewheel={{ forceToAxis: true }}
            pagination={{ clickable: true }}
          >
            {Array.isArray(infos) &&
              infos.map((info) => (
                <SwiperSlide key={info.id}>
                  <Row>
                    <Col md={3}>
                      <img
                        className="image"
                        src={`/imgs/detail/${info.image}`}
                        alt={info.name}
                      />
                    </Col>
                    <Col md={7}>
                      <div className="rtinfo">
                        <Row className="namenbtn">
                          <Col md={9}>
                            <div className="rtname">{info.name}</div>
                          </Col>
                          <Col md={3}>
                                <button 
                                    className="resbtn btn"
                                    onClick={()=>reservation(info)}
                                >
                                    예약하기
                                </button>
                          </Col>
                        </Row>
                        <div className="rtinnerbox">
                          <div className="timeninfo">
                            <div className="ribox">
                              <Row className="pt1d2 pb-1">
                                <Col md={2}>
                                  <div className="pe-2 bold">객실정보</div>
                                </Col>
                                <Col md={10}>
                                  <div className="subinfo">{info.personnel}</div>
                                </Col>
                              </Row>
                              <Row className="pb-1">
                                <Col md={2}>
                                  <div className="pe-2 bold">이용정보</div>
                                </Col>
                                <Col md={10}>
                                  <div className="times">
                                    <div className="subinfo">입실 {info.checkin}</div>
                                    <div className="subinfo">퇴실 {info.checkout}</div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={2}>
                                  <div className="pe-2 bold">추가정보</div>
                                </Col>
                                <Col md={10}>
                                  <div className="subinfo">{info.extra}</div>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={2}>
                                  <div className="pe-2 bold">가격정보</div>
                                </Col>
                                <Col md={10}>
                                  <div className="subinfo">
                                    {Number(info.discountprice).toLocaleString()}원
                                    <del>({Number(info.regularprice).toLocaleString()}원)</del>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </SwiperSlide>
              ))}
          </Swiper>
        </Col>
        <Col md={1} className="text-center">
          <Button className="hero-next">
            <RiArrowRightWideFill className="hero-next" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Room;
