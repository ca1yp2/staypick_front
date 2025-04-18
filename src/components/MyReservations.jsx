// src/components/mypage/MyReservations.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get('/data/reservations.json');
        const myReservations = res.data.filter(r => r.userId === user.id);
        setReservations(myReservations);
      } catch (err) {
        console.error('예약 내역 불러오기 실패:', err);
      }
    };
    fetchReservations();
  }, [user.id]);

  return (
    <div>
      <h2>예약 내역</h2>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <ul>
          {reservations.map((r) => (
            <li key={r.id}>
              <strong>호텔 ID:</strong> {r.hotelId} <br />
              <strong>체크인:</strong> {r.checkIn} <br />
              <strong>체크아웃:</strong> {r.checkOut} <br />
              <strong>상태:</strong> {r.status}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;
