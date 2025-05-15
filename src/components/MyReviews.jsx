import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyReviews.css';
import { FaStar } from 'react-icons/fa';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [resReviews, resHotels, resRooms, resReservations] = await Promise.all([
          axios.get('/data/reviews.json'),
          axios.get('/data/hotels.json'),
          axios.get('/data/rooms.json'),
          axios.get('/data/reservation.json'),
        ]);

        const myReviews = resReviews.data.filter(r => r.userId === user.id);
        setReviews(myReviews);
        setHotels(resHotels.data);
        setRooms(resRooms.data);
        setReservations(resReservations.data);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
      }
    };

    fetchData();
  }, [user]);

  const getHotelById = (id) => hotels.find(h => h.id === id);
  const getRoomById = (id) => rooms.find(r => r.id === id);
  const getReservationByReview = (review) =>
    reservations.find(r => r.hotelId === review.hotelId && r.roomId === review.roomId);

  if (!user) {
    return <div className="review-container">⚠️ 로그인이 필요합니다.</div>;
  }

  return (
    <div className="review-container">
      <h2 className="review-title">내가 작성한 리뷰</h2>
      {reviews.map((review) => {
        const hotel = getHotelById(review.hotelId);
        const room = getRoomById(review.roomId);
        const reservation = getReservationByReview(review);

        return (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div>
                <h3 className="hotel-name">{hotel?.name}</h3>
                <p className="hotel-sub">{hotel?.location} / {room?.name}</p>
                <p className="hotel-dates">체크인: {reservation?.checkIn} / 체크아웃: {reservation?.checkOut}</p>
              </div>
              <p className="review-date">{review.createdAt}</p>
            </div>

            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className="star-icon"
                  color={i < review.rating ? '#f39c12' : '#e0e0e0'}
                />
              ))}
            </div>

            <p className="review-content">{review.content}</p>

            {review.img && (
              <div className="review-images">
                <img
                  src={`/imgs/review-images/${review.img}`}
                  alt="리뷰 이미지"
                  className="review-thumbnail"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyReviews;
