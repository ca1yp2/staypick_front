import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import {  RiArrowRightSLine, RiStarFill, RiMapPin2Fill, RiSendPlaneFill } from "react-icons/ri";
import '../css/detail.css'
import 'bootstrap/dist/css/bootstrap.css';
import Room from '../components/Room';
import MapModal from '../components/MapModal';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotelIdFromState = location.state?.id;
  const [hotel, sethotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomInfos, setroomInfos] = useState([]);
  const [services, setServices] = useState([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [modalLocation, setModalLocation] =useState('');

  const handleShowMapModal = (location) => {
    setModalLocation(location);
    setIsMapModalVisible(true);
  };

  const handleCloseMapModal = () => {
    setIsMapModalVisible(false);
    setModalLocation('');
  }

  useEffect(() => {
    //Room 데이터 불러오기
    axios
      .get('/data/rooms.json')
      .then((res)=>setroomInfos(res.data))
      .catch((err)=>console.log('Room 데이터 로딩 실패', err));

    //호텔 상세 정보 불러오기
    if(hotelIdFromState){
      const fetchHotelDetail = async () => {
        try{
          const hotelResponse = await axios.get('/data/hotels.json');
          const reviewResponse = await axios.get('/data/reviews.json');
          const serviceResponse = await axios.get('/data/service.json');

          console.log('reviewResponse.data:', reviewResponse.data);

          const hotelData = hotelResponse.data;
          const reviewData = reviewResponse.data;
          const serviceData = serviceResponse.data;

          const hotelId = parseInt(hotelIdFromState);
          const foundHotel = hotelData.find(h => h.id === hotelId);
          const foundReviews = reviewData.filter(r => r.hotelId === hotelId);
          const foundServices = serviceData.find(s => s.hotelId === hotelId)?.services || [];
         
          if(foundHotel) {
            sethotel({...foundHotel, reviews: foundReviews});
            setServices(foundServices);
            setLoading(false);
          } else {
            setError('해당 ID의 호텔을 찾을 수 없습니다.');
            setLoading(false);
          }
        } catch(error){
          setError('데이터를 불러오는 데 실패했습니다.');
          setLoading(false);
        }
      };
      fetchHotelDetail();
    }else{
      setLoading(false);
      setError('호텔 ID가 없습니다.');
    }
  }, [hotelIdFromState]);

  const handleReservation = () => {
    if(hotel && roomInfos.length > 0) {
      const roomDataToSend = roomInfos[0];
      navigate('/payment', {
        state: {
          hotel: hotel,
          roomData: roomDataToSend
        }
      });
    } else{
      alert('선택된 호텔 정보가 없습니다.');
    }
  };

  if(loading){
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Error: {error}</div>;
  }

  if(!hotel){
    return <div>호텔 정보를 찾을 수 없습니다.</div>;
  }

  console.log('hotel 객체:', hotel);
  console.log('hotel.reviews 배열:', hotel?.reviews);

  return (
    <Container>
      <Row>
        <Col md={5}>
          <div className="room-type">{hotel.category}</div>
          <div className="acc-name">{hotel.name}</div>
          <div className="acc-tag">#인기있는 숙소 #후기 좋은 숙소</div>
          <div className="pricetag">{hotel.price.toLocaleString()}원~</div>
          <div className="review-table">
            <div className="text-wrapper-5"><span onClick={() => navigate(`/reviewdetail/${hotel.id}`)}>후기 <RiArrowRightSLine /></span></div>
            {hotel.reviews && hotel.reviews.length > 0 && (
              <Swiper
                modules={[Autoplay, Mousewheel, Navigation, Pagination]}
                slidesPerView={1}
                loop={hotel.reviews.length > 1}
                mousewheel
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: false
                }}
              >
                {hotel.reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <Row className='ml' key={review.id || index}>
                      <Col md={9}><div className="reviewbox">
                        <div className="grade"> {[...Array(Math.round(review.rating))].map((_, i) => (
                            <RiStarFill key={i} className='yellow' />
                          ))} <span>({review.rating})</span></div>
                        <div className="review">
                          {review.content}
                        </div>
                      </div></Col>
                      {review.img && review.img !== "" && (
                        <Col md={3}>
                          <img className="reviewimg" src={`/imgs/review-images/${review.img}`} alt="review" />
                        </Col>
                      )}
                    </Row>
                  </SwiperSlide>
                ))}
              </Swiper>
          )}
          </div>
          <div className="service-table">
            <div className="service-main">서비스 및 부대시설</div>
            <Row className='ml' key="servies-row">
              {services.map((service, index) => (
                <Col md={4} key={service.id || index}><span><img src={`imgs/detail/${service.image}`} alt={service.name} />{service.name}</span></Col>
              ))}
            </Row>
          </div>
          <div className="location-table">
            <div className="location-main">위치 정보</div>
            <div className="location-sub1"><RiMapPin2Fill /> {hotel.detaillocation} <span onClick={() => handleShowMapModal(hotel.detaillocation)}>지도보기</span></div>
            <div className="location-sub2"><RiSendPlaneFill /> {hotel.detaillocation.split(' ')[0]}</div>
          </div>
        </Col>
        <Col md={7} className='mt-10'>
          <Row className='imgbox'>
            <Col md={6} className="imgbox1">
              <img src={`/imgs/hotel-images/${hotel.image}`} alt={hotel.name} />
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
          <Room infos={roomInfos} hotel={hotel} />
        </Col>
      </Row>
      <MapModal show={isMapModalVisible} onHide={handleCloseMapModal} address={modalLocation} />
    </Container>
  )
}

export default Detail