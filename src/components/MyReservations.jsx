import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyReservations.css'; // 필요 시 스타일 분리

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReservations = await axios.get('/data/reservation.json');
        const resHotels = await axios.get('/data/hotels.json');
        const myReservations = resReservations.data.filter(r => r.userId === user.id);
        setReservations(myReservations);
        setHotels(resHotels.data);
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };
    fetchData();
  }, [user.id]);

  const getHotelById = (id) => hotels.find(h => h.id === id);

  const renderStatus = (status) => {
    const statusMap = {
      confirmed: { text: '예약 완료', color: 'green' },
      cancelled: { text: '예약 취소', color: 'red' }
    };
    const { text, color } = statusMap[status] || { text: '알 수 없음', color: 'gray' };
    return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
  };

  return (
    <div className="reservation-list">
      <h2>예약 내역</h2>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        reservations.map((r) => {
          const hotel = getHotelById(r.hotelId);
          return (
            <div key={r.id} className="reservation-card">
              <img src={`/imgs/${hotel?.image}`} alt={hotel?.name} className="hotel-img" />
              <div className="reservation-info">
                <h3>{hotel?.name}</h3>
                <p>{hotel?.location}</p>
                <p>
                  체크인: <strong>{r.checkIn}</strong> / 체크아웃: <strong>{r.checkOut}</strong>
                </p>
                <p>가격: {hotel?.price.toLocaleString()}원</p>
                <p>상태: {renderStatus(r.status)}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyReservations;
