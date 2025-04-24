
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyReservations.css';
import CancelModal from '../components/CancelModal';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const resReservations = await axios.get('/data/reservation.json');
        const resHotels = await axios.get('/data/hotels.json');
        const resRooms = await axios.get('/data/rooms.json')

        const myReservations = resReservations.data.filter(r => r.userId === user.id);
        setReservations(myReservations);
        setHotels(resHotels.data);
        setRooms(resRooms.data);
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };
    fetchData();
  }, [user]);

  const getHotelById = (id) => hotels.find(h => h.id === id);
  const getRoomById = (id) => rooms.find(r => r.id === id);

  const handleCancelClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const confirmCancel = () => {
    const updated = reservations.map(r =>
      r.id === selectedId ? { ...r, status: 'cancelled' } : r
    );
    setReservations(updated);
    setOpenModal(false);
  };

  const renderStatus = (status) => {
    const statusMap = {
      confirmed: { text: '예약 완료', color: 'green' },
      cancelled: { text: '예약 취소', color: 'red' }
    };
    const { text, color } = statusMap[status] || { text: '알 수 없음', color: 'gray' };
    return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
  };

  if (!user) return <div className="reservation-list">⚠️ 로그인이 필요합니다.</div>;

  return (
    <div className="reservation-list">
      <h2>예약 내역</h2>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        reservations.map((r) => {
          const hotel = getHotelById(r.hotelId);
          const room = getRoomById(r.roomId);
          return (
            <div key={r.id} className="reservation-card">
              <img
                src={`/imgs/hotel-images/${hotel?.image || 'default.png'}`}
                alt={hotel?.name}
                className="hotel-img"
              />
              <div className="reservation-info">
                <h3>{hotel?.name || '호텔 정보를 찾을 수 없습니다'}</h3>
                <p>{hotel?.location}</p>
                <p>객실명: <strong>{room?.name || '객실 정보 없음'}</strong></p>
                <p>{room?.extra}</p>
                <p>체크인: <strong>{r.checkIn}</strong> / 체크아웃: <strong>{r.checkOut}</strong></p>
                <p>가격: {hotel?.price?.toLocaleString()}원</p>
                <p>상태: {renderStatus(r.status)}</p>
                {r.status === 'confirmed' && (
                  <div className="button-group">
                    <button className="review-btn" onClick={() => alert('리뷰 작성 페이지로 이동')}>리뷰 쓰기</button>
                    <button className="cancel-btn" onClick={() => handleCancelClick(r.id)}>예약 취소</button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
      <CancelModal open={openModal} onClose={() => setOpenModal(false)} onConfirm={confirmCancel} />
    </div>
  );
};

export default MyReservations;
