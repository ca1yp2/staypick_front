import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyReservations.css';
import CancelModal from '../components/CancelModal';
import { useNavigate } from 'react-router-dom';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const userData = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || initialLoaded) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8081/mypage/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setReservations(res.data);
        setInitialLoaded(true);
      } catch (err) {
        console.error('예약 내역 불러오기 실패:', err);
      }
    };

    fetchData();
  }, [user, initialLoaded]);

  const handleCancelClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const confirmCancel = async () => {
  try {
    await axios.put(`http://localhost:8081/api/reservations/${selectedId}/cancel`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const updated = reservations.map(r =>
      r.id === selectedId ? { ...r, status: 'cancelled' } : r
    );
    setReservations(updated);
    setOpenModal(false);
    alert('예약이 성공적으로 취소되었습니다.');
      } catch (err) {
        console.error('❌ 예약 취소 실패:', err);
        alert('예약 취소에 실패했습니다. 다시 시도해 주세요.');
      }
    };

  const renderStatus = (status) => {
    const normalized = status?.toLowerCase().trim();

    const statusMap = {
      confirmed: { text: '예약 완료', color: 'green' },
      cancelled: { text: '예약 취소', color: 'red' },
      '예약완료': { text: '예약 완료', color: 'green' },
      '취소됨': { text: '예약 취소', color: 'red' }
    };

    const { text, color } = statusMap[normalized] || { text: '알 수 없음', color: 'gray' };
    return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
  };

  if (!user) {
    return <div className="reservation-list">⚠️ 로그인이 필요합니다.</div>;
  }

  return (
    <div className="reservation-list">
      <h2>예약 내역</h2>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        reservations.map((r) => {
          const thumbnailPath = `http://localhost:8081/upload/hotels/${encodeURIComponent(r.thumbnail)}`;

          console.log(`[썸네일 경로] ${thumbnailPath}`);

          return (
            <div key={`${r.id}-${r.status}`} className="reservation-card">
              <img
                src={thumbnailPath}
                alt="썸네일"
                className="reservation-thumbnail"
                onError={(e) => {
                  console.warn(`❌ 이미지 로드 실패: ${e.target.src}`);
                  e.target.onerror = null; // 🔒 무한 루프 방지
                  e.target.src = '/default.png'; // ⚠️ default.jpg는 public 디렉토리에 있어야 함
                }}
              />
              <div className="reservation-info">
                <h3>{r.accommodationName}</h3>
                <p>객실명: <strong>{r.roomName}</strong></p>
                <p>체크인: <strong>{r.checkIn}</strong> / 체크아웃: <strong>{r.checkOut}</strong></p>
                <p>상태: {renderStatus(r.status)}</p>

                {r.status === 'confirmed' && (
                  <div className="button-group">
                    <button className="review-btn" onClick={() => navigate(`/review/write/${r.id}`)}>리뷰 쓰기</button>
                    <button className="cancel-btn" onClick={() => handleCancelClick(r.id)}>예약 취소</button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}

      <CancelModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmCancel}
      />
    </div>
  );
};

export default MyReservations;
